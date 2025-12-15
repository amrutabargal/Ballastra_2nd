// Backend/models/pulseModel.js
import pool from '../config/db.js';

export async function createPulse({ space_id, user_id, message, metadata = {} }) {
  const q = `INSERT INTO pulses (space_id, user_id, message, metadata)
             VALUES ($1,$2,$3,$4) RETURNING *`;
  const { rows } = await pool.query(q, [space_id, user_id, message, metadata]);
  return rows[0];
}

export async function getPulses(spaceId, limit=50) {
  const q = `SELECT p.*, u.* FROM pulses p LEFT JOIN users u ON u.id = p.user_id
             WHERE p.space_id=$1 ORDER BY p.created_at DESC LIMIT $2`;
  const { rows } = await pool.query(q, [spaceId, limit]);
  return rows;
}
