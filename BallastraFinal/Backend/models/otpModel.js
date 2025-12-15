import pool from "../config/db.js";

export async function createOtp({ user_id, code, purpose = 'forgot_password', ttlMinutes = 15 }) {
  const expires_at = new Date(Date.now() + ttlMinutes * 60 * 1000);
  const q = `INSERT INTO otps (user_id, code, purpose, expires_at) VALUES ($1,$2,$3,$4) RETURNING *`;
  const { rows } = await pool.query(q, [user_id, code, purpose, expires_at]);
  return rows[0];
}

export async function findValidOtp({ user_id, code, purpose }) {
  // allow lookup either by (user_id + code + purpose) or by (code + purpose)
  if (user_id) {
    const q = `SELECT * FROM otps WHERE user_id=$1 AND code=$2 AND purpose=$3 AND used=false AND expires_at > now() ORDER BY created_at DESC LIMIT 1`;
    const { rows } = await pool.query(q, [user_id, code, purpose]);
    return rows[0];
  } else {
    const q = `SELECT * FROM otps WHERE code=$1 AND purpose=$2 AND used=false AND expires_at > now() ORDER BY created_at DESC LIMIT 1`;
    const { rows } = await pool.query(q, [code, purpose]);
    return rows[0];
  }
}

export async function markOtpUsed(id) {
  const q = `UPDATE otps SET used=true WHERE id=$1 RETURNING *`;
  const { rows } = await pool.query(q, [id]);
  return rows[0];
}
