// Backend/models/messageModel.js
import pool from "../config/db.js";

export async function createMessage({ chat_id, user_id, body = '', attachments = [] }) {
  const q = `INSERT INTO messages (chat_id, user_id, body, attachments) VALUES ($1,$2,$3,$4) RETURNING *`;
  const { rows } = await pool.query(q, [chat_id, user_id, body, attachments]);
  return rows[0];
}

export async function getMessages(chatId, limit = 50, offset = 0) {
  const q = `SELECT m.*, u.name as sender_name, u.avatar as sender_avatar
             FROM messages m
             LEFT JOIN users u ON u.id = m.user_id
             WHERE m.chat_id = $1 AND m.deleted = false
             ORDER BY m.created_at DESC
             LIMIT $2 OFFSET $3`;
  const { rows } = await pool.query(q, [chatId, limit, offset]);
  return rows;
}

export async function getMessageById(messageId) {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id=$1', [messageId]);
  return rows[0];
}

export async function updateMessage(messageId, fields = {}) {
  const keys = Object.keys(fields);
  if (!keys.length) return getMessageById(messageId);
  const set = keys.map((k,i) => `${k}=$${i+1}`).join(', ');
  const vals = keys.map(k => fields[k]);
  vals.push(messageId);
  const q = `UPDATE messages SET ${set}, updated_at = now() WHERE id=$${vals.length} RETURNING *`;
  const { rows } = await pool.query(q, vals);
  return rows[0];
}

export async function deleteMessage(messageId) {
  const q = `UPDATE messages SET deleted=true, body='' WHERE id=$1 RETURNING *`;
  const { rows } = await pool.query(q, [messageId]);
  return rows[0];
}
