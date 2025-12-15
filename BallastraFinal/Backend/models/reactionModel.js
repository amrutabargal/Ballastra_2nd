// Backend/models/reactionModel.js
import pool from '../config/db.js';

export async function reactToDiscussion(discussionId, userId, type='like') {
  const q = `INSERT INTO reactions (discussion_id, user_id, type)
             VALUES ($1,$2,$3) ON CONFLICT (discussion_id, user_id, type) DO NOTHING RETURNING *`;
  const { rows } = await pool.query(q, [discussionId, userId, type]);
  return rows[0] || null;
}

export async function getReactionsForDiscussion(discussionId) {
  const q = `SELECT type, count(*) as cnt FROM reactions WHERE discussion_id=$1 GROUP BY type`;
  const { rows } = await pool.query(q, [discussionId]);
  return rows;
}
