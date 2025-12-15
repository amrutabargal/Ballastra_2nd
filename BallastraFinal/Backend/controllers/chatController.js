
import * as chatModel from "../models/chatModel.js";

/**
 * Create chat (direct or group). For direct chat, frontend can set type='direct' and optionally name=null.
 * Body example: { name, type, members: [userId1, userId2], metadata }
 */
export async function createChatHandler(req, res, next) {
  try {
    const { name = null, type = "direct", members = [], metadata = {} } = req.body;
    const created_by = req.user.id;

    const chat = await chatModel.createChat({ name, type, created_by, metadata });

    // add creator as owner
    await chatModel.addMember(chat.id, created_by, 'owner');

    // add other members
    for (const m of members || []) {
      await chatModel.addMember(chat.id, m, 'member');
    }

    res.status(201).json({ success: true, data: chat });
  } catch (err) { next(err); }
}

export async function listChatsHandler(req, res, next) {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const rows = await chatModel.listUserChats(req.user.id, Number(limit), Number(offset));
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

export async function getChatHandler(req, res, next) {
  try {
    const { chatId } = req.params;
    const chat = await chatModel.getChatById(chatId);
    if (!chat) return res.status(404).json({ success:false, message:'Chat not found' });
    const members = await chatModel.listMembers(chatId);
    res.json({ success:true, data: { ...chat, members } });
  } catch (err) { next(err); }
}

export async function addMemberHandler(req, res, next) {
  try {
    const { chatId } = req.params;
    const { userId, role } = req.body;
    const added = await chatModel.addMember(chatId, userId, role || 'member');
    res.status(201).json({ success:true, data: added });
  } catch (err) { next(err); }
}

export async function removeMemberHandler(req, res, next) {
  try {
    const { chatId, userId } = req.params;
    const removed = await chatModel.removeMember(chatId, userId);
    res.json({ success:true, data: removed });
  } catch (err) { next(err); }
}
