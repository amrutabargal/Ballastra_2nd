// Backend/models/discussionModel.js
import pool from '../config/db.js';

export async function createDiscussion({ space_id, user_id, title, body, attachments = [] }) {
  const q = `INSERT INTO discussions (space_id, user_id, title, body, attachments)
             VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const { rows } = await pool.query(q, [space_id, user_id, title, body, attachments]);
  return rows[0];
}

export async function getDiscussionsBySpace(spaceId, limit = 50, offset = 0) {
  const q = `SELECT d.*, u.* FROM discussions d
             LEFT JOIN users u ON u.id = d.user_id
             WHERE d.space_id=$1
             ORDER BY d.created_at DESC LIMIT $2 OFFSET $3`;
  const { rows } = await pool.query(q, [spaceId, limit, offset]);
  return rows;
}
