// Backend/socket.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import * as messageModel from "./models/messageModel.js";
import * as reactionModel from "./models/reactionModel.js";
import * as chatModel from "./models/chatModel.js";
import * as userModel from "./models/userModel.js"; // for presence last_seen

// track online users
const onlineUsers = new Map();  // userId -> socketId

export function initSocket(httpServer, { corsOrigin = "*" } = {}) {
  const io = new Server(httpServer, {
    cors: { origin: corsOrigin, methods: ["GET", "POST"] }
  });

  // Auth
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("auth error"));
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = { id: payload.id, email: payload.email, name: payload.name };
      next();
    } catch (e) {
      next(new Error("auth error"));
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.user.id;
    onlineUsers.set(userId, socket.id);

    // Update user online status in DB (optional)
    await userModel.updateUser(userId, { is_online: true });

    // Broadcast presence
    socket.broadcast.emit("presence_online", { userId });

    // -------------------------------
    // JOIN / LEAVE CHAT
    // -------------------------------
    socket.on("join_chat", ({ chatId }) => {
      socket.join(`chat:${chatId}`);
    });

    socket.on("leave_chat", ({ chatId }) => {
      socket.leave(`chat:${chatId}`);
    });

    // -------------------------------
    // SEND MESSAGE
    // -------------------------------
    socket.on("send_message", async (payload, ack) => {
      try {
        const { chatId, body = "", attachments = [] } = payload;

        const message = await messageModel.createMessage({
          chat_id: chatId,
          user_id: userId,
          body,
          attachments
        });

        const sendData = { ...message, sender: socket.user };

        io.to(`chat:${chatId}`).emit("message_new", sendData);

        ack?.({ success: true, data: sendData });
      } catch (err) {
        ack?.({ success: false, message: err.message });
      }
    });

    // -------------------------------
    // TYPING INDICATORS
    // -------------------------------
    socket.on("typing", ({ chatId }) => {
      socket.to(`chat:${chatId}`).emit("typing", { chatId, userId });
    });

    socket.on("stop_typing", ({ chatId }) => {
      socket.to(`chat:${chatId}`).emit("stop_typing", { chatId, userId });
    });

    // -------------------------------
    // EDIT / DELETE MESSAGE
    // -------------------------------
    socket.on("edit_message", async ({ messageId, chatId, body }, ack) => {
      try {
        const updated = await messageModel.updateMessage(messageId, {
          body,
          edited: true
        });

        io.to(`chat:${chatId}`).emit("message_edited", updated);
        ack?.({ success: true, data: updated });
      } catch (e) {
        ack?.({ success: false, message: e.message });
      }
    });

    socket.on("delete_message", async ({ messageId, chatId }, ack) => {
      try {
        await messageModel.deleteMessage(messageId);
        io.to(`chat:${chatId}`).emit("message_deleted", { id: messageId });
        ack?.({ success: true });
      } catch (e) {
        ack?.({ success: false, message: e.message });
      }
    });

    // -------------------------------
    // REACTIONS
    // -------------------------------
    socket.on("react_message", async ({ chatId, messageId, type }, ack) => {
      try {
        await reactionModel.addReaction(messageId, userId, type);
        const stats = await reactionModel.getReactionsForMessage(messageId);

        io.to(`chat:${chatId}`).emit("reaction_updated", {
          messageId,
          stats
        });

        ack?.({ success: true, data: stats });
      } catch (e) {
        ack?.({ success: false, message: e.message });
      }
    });

    // -------------------------------
    // CALLING SYSTEM (VOICE / VIDEO)
    // -------------------------------
    socket.on("call_request", ({ toUserId, callType }) => {
      const targetSocket = onlineUsers.get(toUserId);
      if (targetSocket) {
        io.to(targetSocket).emit("call_request", {
          from: userId,
          callType
        });
      }
    });

    socket.on("call_accept", ({ toUserId }) => {
      const targetSocket = onlineUsers.get(toUserId);
      if (targetSocket) {
        io.to(targetSocket).emit("call_accept", { from: userId });
      }
    });

    socket.on("call_reject", ({ toUserId }) => {
      const targetSocket = onlineUsers.get(toUserId);
      if (targetSocket) {
        io.to(targetSocket).emit("call_reject", { from: userId });
      }
    });

    socket.on("call_end", ({ toUserId }) => {
      const targetSocket = onlineUsers.get(toUserId);
      if (targetSocket) {
        io.to(targetSocket).emit("call_end", { from: userId });
      }
    });

    // WebRTC signaling
    socket.on("webrtc_signal", ({ toUserId, data }) => {
      const targetSocket = onlineUsers.get(toUserId);
      if (targetSocket) {
        io.to(targetSocket).emit("webrtc_signal", { from: userId, data });
      }
    });

    // -------------------------------
    // DISCONNECT
    // -------------------------------
    socket.on("disconnect", async () => {
      onlineUsers.delete(userId);

      await userModel.updateUser(userId, {
        is_online: false,
        last_seen: new Date()
      });

      socket.broadcast.emit("presence_offline", { userId });
    });
  });

  return io;
}
