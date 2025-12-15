// Backend/models/notificationModel.js
import pool from '../config/db.js';

export async function listNotifications(userId, limit=50) {
  const q = `SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC LIMIT $2`;
  const { rows } = await pool.query(q, [userId, limit]);
  return rows;
}

export async function markRead(notificationId) {
  const q = `UPDATE notifications SET is_read = true WHERE id=$1 RETURNING *`;
  const { rows } = await pool.query(q, [notificationId]);
  return rows[0];
}

export async function createNotification(userId, type, payload = {}) {
  const q = `INSERT INTO notifications (user_id, type, payload) VALUES ($1,$2,$3) RETURNING *`;
  const { rows } = await pool.query(q, [userId, type, payload]);
  return rows[0];
}
