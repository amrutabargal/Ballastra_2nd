import { notifyUser } from "../services/notificationService.js";
import { sendNotificationSocket } from "../socket/notification.socket.js";
import * as messageModel from "../models/messageModel.js";
import * as reactionModel from "../models/reactionModel.js";
import * as orbitModel from "../models/orbitModel.js";
import * as chatModel from "../models/chatModel.js";

/* create message via REST (used when client wants REST fallback) */
export async function sendMessageHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const { chatId } = req.params;
    const { body = "", attachments = [], mentions = [] } = req.body;

    const chat = await chatModel.getChatById(chatId);

    if (chat.type === "direct") {
      const members = await chatModel.listMembers(chatId);
      const other = members.find(m => m.user_id !== userId);
      if (!other) {
        return res.status(400).json({ success:false, message:"No recipient" });
      }
      const mutual = await orbitModel.isMutual(userId, other.user_id);
      if (!mutual) {
        return res.status(403).json({ success:false, message:"Mutual follow required" });
      }
    }

    const message = await messageModel.createMessage({
      chat_id: chatId,
      user_id: userId,
      body,
      attachments
    });

    //Discord-style notifications
    const members = await chatModel.listMembers(chatId);

    for (const m of members) {
      if (m.user_id === userId) continue;

      const payload = {
        user_id: m.user_id,
        type: "MESSAGE",
        purpose: "New message received",
        source: message.id
      };

      const notif = await notifyUser(payload);
      sendNotificationSocket(req.io, m.user_id, notif);
    }

    // override
    for (const mentionedUserId of mentions) {
      const payload = {
        user_id: mentionedUserId,
        type: "MENTION",
        purpose: "You were mentioned in a message",
        source: message.id
      };

      const notif = await notifyUser(payload);
      sendNotificationSocket(req.io, mentionedUserId, notif);
    }

    res.json({ success:true, data: message });
  } catch (err) { next(err); }
}


export async function getMessagesHandler(req, res, next) {
  try {
    const { chatId } = req.params;
    const { limit = 50, offset = 0 } = req.query;
    const rows = await messageModel.getMessages(chatId, Number(limit), Number(offset));
    res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}

export async function editMessageHandler(req, res, next) {
  try {
    const { messageId } = req.params;
    const { body } = req.body;
    const updated = await messageModel.updateMessage(messageId, { body, edited: true });
    res.json({ success:true, data: updated });
  } catch (err) { next(err); }
}

export async function deleteMessageHandler(req, res, next) {
  try {
    const { messageId } = req.params;
    const deleted = await messageModel.deleteMessage(messageId);
    res.json({ success:true, data: deleted });
  } catch (err) { next(err); }
}

export async function addReactionHandler(req, res, next) {
  try {
    const { messageId } = req.params;
    const { type } = req.body;

    const added = await reactionModel.addReaction(
      messageId,
      req.user.id,
      type || "like"
    );

    const messageOwner = await messageModel.getMessageOwner(messageId);

    if (messageOwner && messageOwner !== req.user.id) {
      const payload = {
        user_id: messageOwner,
        type: "REACTION",
        purpose: "Someone reacted to your message",
        source: messageId
      };

      const notif = await notifyUser(payload);
      sendNotificationSocket(req.io, messageOwner, notif);
    }

    const stats = await reactionModel.getReactionsForMessage(messageId);
    res.json({ success:true, data: stats });
  } catch (err) { next(err); }
}

