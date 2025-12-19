// Backend/socket.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import * as messageModel from "../models/messageModel.js";
import * as reactionModel from "../models/reactionModel.js";
import * as moderationModel from "../models/moderationModel.js";
import * as chatModel from "../models/chatModel.js";
import * as userModel from "../models/userModel.js"; // for presence last_seen

// track online users
const onlineUsers = new Map();  // userId -> 

// voice states: channelId -> Map(userId -> state)
const voiceStates = new Map();
function getVoiceState(channelId, userId) {
  if (!voiceStates.has(channelId)) {
    voiceStates.set(channelId, new Map());
  }

  const channelMap = voiceStates.get(channelId);

  if (!channelMap.has(userId)) {
    channelMap.set(userId, {
      muted: false,
      deafened: false,
      adminMuted: false
    });
  }

  return channelMap.get(userId);
}


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

    // TEXT CHANNEL JOIN / LEAVE
    // -------------------------------
    socket.on("join_channel", ({ channelId }) => {
      socket.join(`channel:${channelId}`);
    });

    socket.on("leave_channel", ({ channelId }) => {
      socket.leave(`channel:${channelId}`);
    });

    // VOICE CHANNEL JOIN / LEAVE
    // -------------------------------
    socket.on("join_voice_channel", async ({ channelId }) => {
      const channel = await channelModel.getChannelById(channelId);
      const settings = channel?.settings || {};

      const timeout = await moderationModel.getActiveTimeout(
        channel.nexus_id,
        userId
      );
      if (timeout) return;
      
    
      if (settings.locked) return;
    
      socket.join(`voice:${channelId}`);
      socket.to(`voice:${channelId}`).emit("voice_user_joined", { userId });
    });
    

    socket.on("leave_voice_channel", ({ channelId }) => {
      socket.leave(`voice:${channelId}`);
      // cleanup voice state
      if (voiceStates.has(channelId)) {
        voiceStates.get(channelId).delete(userId);
      }
      socket.to(`voice:${channelId}`).emit("voice_user_left", {
        userId
      });
    });

    // VIDEO TOGGLE (DISCORD STYLE)
    // -------------------------------
    socket.on("video_toggle", ({ channelId, enabled }) => {
      socket.to(`voice:${channelId}`).emit("video_toggle", {
        userId,
        enabled
      });
    });

    // start screen share
    socket.on("screen_share_start", ({ channelId }) => {
      socket.to(`voice:${channelId}`).emit("screen_share_started", {
        userId
      });
    });

    // stop screen share
    socket.on("screen_share_stop", ({ channelId }) => {
      socket.to(`voice:${channelId}`).emit("screen_share_stopped", {
        userId
      });
    });

    // USER MUTE / UNMUTE
    // -------------------------------
    socket.on("voice_mute", ({ channelId, muted }) => {
      const state = getVoiceState(channelId, userId);
      state.muted = muted;

      socket.to(`voice:${channelId}`).emit("voice_user_muted", {
        userId,
        muted
      });
    });

    // USER DEAFEN / UNDEAFEN
    // -------------------------------
    socket.on("voice_deafen", ({ channelId, deafened }) => {
      const state = getVoiceState(channelId, userId);
      state.deafened = deafened;

      socket.to(`voice:${channelId}`).emit("voice_user_deafened", {
        userId,
        deafened
      });
    });


    // ADMIN MUTE / UNMUTE
    // -------------------------------
    socket.on("voice_admin_mute", ({ channelId, targetUserId, muted }) => {
      const channelMap = voiceStates.get(channelId);
      if (!channelMap) return;

      const targetState = getVoiceState(channelId, targetUserId);
      targetState.adminMuted = muted;

      io.to(`voice:${channelId}`).emit("voice_admin_muted", {
        userId: targetUserId,
        muted
      });
    });
    
    //Block video if disabled
    socket.on("video_toggle", async ({ channelId, enabled }) => {
      const channel = await channelModel.getChannelById(channelId);
      const settings = channel?.settings || {};
    
      if (!settings.videoEnabled && enabled) return;
    
      socket.to(`voice:${channelId}`).emit("video_toggle", {
        userId,
        enabled
      });
    });

    //Block screen sharing if disabled
    socket.on("screen_share_start", async ({ channelId }) => {
      const channel = await channelModel.getChannelById(channelId);
      const settings = channel?.settings || {};
    
      if (!settings.screenShareEnabled) return;
    
      socket.to(`voice:${channelId}`).emit("screen_share_started", {
        userId
      });
    });
    

    // -------------------------------
    // DISCONNECT
    // -------------------------------
    socket.on("disconnect", async () => {
      onlineUsers.delete(userId);
      // 🔊 cleanup voice states for ALL channels
      voiceStates.forEach((map) => map.delete(userId));

      await userModel.updateUser(userId, {
        is_online: false,
        last_seen: new Date()
      });

      socket.broadcast.emit("presence_offline", { userId });
    });
  });

  return io;
}
