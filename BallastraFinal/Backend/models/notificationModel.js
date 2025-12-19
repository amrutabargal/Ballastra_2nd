import db from "../config/db.js";

export const createNotification = async (data) => {
  const query = `
    INSERT INTO notifications
    (id, user_id, type, purpose, source, is_read)
    VALUES (gen_random_uuid(), $1, $2, $3, $4, false)
    RETURNING *`;
  const values = [
    data.user_id,
    data.type,
    data.purpose,
    data.source
  ];
  const { rows } = await db.query(query, values);
  return rows[0];
};

export const getUserNotifications = async (userId, limit = 20) => {
  const { rows } = await db.query(
    `SELECT * FROM notifications
     WHERE user_id=$1
     ORDER BY created_at DESC
     LIMIT $2`,
    [userId, limit]
  );
  return rows;
};

export const markAsRead = async (id, userId) => {
  await db.query(
    `UPDATE notifications SET is_read=true
     WHERE id=$1 AND user_id=$2`,
    [id, userId]
  );
};

export const markAllRead = async (userId) => {
  await db.query(
    `UPDATE notifications SET is_read=true
     WHERE user_id=$1`,
    [userId]
  );
};

