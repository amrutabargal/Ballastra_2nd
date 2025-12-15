// Backend/models/activityModel.js
import pool from '../config/db.js';

export async function logActivity({ nexus_id = null, user_id = null, action, meta = {} }) {
  const q = `INSERT INTO activity_logs (nexus_id, user_id, action, meta) VALUES ($1,$2,$3,$4) RETURNING *`;
  const { rows } = await pool.query(q, [nexus_id, user_id, action, meta]);
  return rows[0];
}

export async function listActivity(nexusId, limit=100) {
  const q = `SELECT * FROM activity_logs WHERE nexus_id=$1 ORDER BY created_at DESC LIMIT $2`;
  const { rows } = await pool.query(q, [nexusId, limit]);
  return rows;
}
