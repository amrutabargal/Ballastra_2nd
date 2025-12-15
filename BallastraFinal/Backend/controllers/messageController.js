// Backend/controllers/messageController.js
import * as messageModel from "../models/messageModel.js";
import * as reactionModel from "../models/reactionModel.js";
import * as orbitModel from "../models/orbitModel.js";

/* create message via REST (used when client wants REST fallback) */
export async function sendMessageHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const { chatId } = req.params;
    // if chat is direct (type direct) and recipient known, check mutual
    const chat = await chatModel.getChatById(chatId);
    if (chat.type === "direct") {
      // find the other member
      const members = await chatModel.listMembers(chatId);
      const other = members.find(m => m.user_id !== userId);
      if (!other) return res.status(400).json({ success:false, message: "No recipient found" });
      const mutual = await orbitModel.isMutual(userId, other.user_id);
      if (!mutual) return res.status(403).json({ success:false, message: "Both users must follow each other to send messages" });
    }
    // create message...
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
    const added = await reactionModel.addReaction(messageId, req.user.id, type || 'like');
    const stats = await reactionModel.getReactionsForMessage(messageId);
    res.json({ success:true, data: stats });
  } catch (err) { next(err); }
}
