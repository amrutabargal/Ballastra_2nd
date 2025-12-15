// Backend/models/chatModel.js
import pool from "../config/db.js";

export async function createChat({ name = null, type = "direct", created_by, metadata = {} }) {
  const q = `INSERT INTO chats (name, type, created_by, metadata) VALUES ($1,$2,$3,$4) RETURNING *`;
  const { rows } = await pool.query(q, [name, type, created_by, metadata]);
  return rows[0];
}

export async function getChatById(chatId) {
  const { rows } = await pool.query('SELECT * FROM chats WHERE id=$1', [chatId]);
  return rows[0];
}

export async function listUserChats(userId, limit = 50, offset = 0) {
  const q = `
    SELECT c.*, cm.role, cm.joined_at, coalesce(m.body, '') as last_message, m.created_at as last_message_at
    FROM chat_members cm
    JOIN chats c ON c.id = cm.chat_id
    LEFT JOIN LATERAL (
      SELECT body, created_at FROM messages WHERE chat_id = c.id ORDER BY created_at DESC LIMIT 1
    ) m ON true
    WHERE cm.user_id = $1
    ORDER BY COALESCE(m.created_at, c.created_at) DESC
    LIMIT $2 OFFSET $3
  `;
  const { rows } = await pool.query(q, [userId, limit, offset]);
  return rows;
}

export async function addMember(chatId, userId, role = 'member') {
  const q = `INSERT INTO chat_members (chat_id, user_id, role) VALUES ($1,$2,$3) ON CONFLICT (chat_id, user_id) DO UPDATE SET role = EXCLUDED.role RETURNING *`;
  const { rows } = await pool.query(q, [chatId, userId, role]);
  return rows[0];
}

export async function removeMember(chatId, userId) {
  const q = `DELETE FROM chat_members WHERE chat_id=$1 AND user_id=$2 RETURNING *`;
  const { rows } = await pool.query(q, [chatId, userId]);
  return rows[0];
}

export async function listMembers(chatId) {
  const q = `
    SELECT cm.user_id, cm.role, cm.joined_at, u.name, u.email, u.avatar
    FROM chat_members cm
    LEFT JOIN users u ON u.id = cm.user_id
    WHERE cm.chat_id = $1
    ORDER BY cm.joined_at ASC
  `;
  const { rows } = await pool.query(q, [chatId]);
  return rows;
}
