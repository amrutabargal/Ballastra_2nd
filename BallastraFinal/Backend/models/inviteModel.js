const pool = require('../config/db');

export async function generateInvite(nexusId, code, invitedBy, expiresAt=null) {
  const q = `INSERT INTO invites (nexus_id, code, invited_by, expires_at) VALUES ($1,$2,$3,$4) RETURNING *`;
  const { rows } = await pool.query(q, [nexusId, code, invitedBy, expiresAt]);
  return rows[0];
}

export async function getInviteByCode(code) {
  const { rows } = await pool.query('SELECT * FROM invites WHERE code=$1', [code]);
  return rows[0];
}

export async function acceptInvite(code, userId) {
  const q = `UPDATE invites SET accepted_by=$1, is_used=true WHERE code=$2 RETURNING *`;
  const { rows } = await pool.query(q, [userId, code]);
  return rows[0];
}

export async function generateInvite(nexusId, code, invitedBy, expiresAt = null, email = null) {
  const q = `INSERT INTO invites (nexus_id, code, invited_by, expires_at, created_at)
             VALUES ($1,$2,$3,$4, now()) RETURNING *`;
  const { rows } = await pool.query(q, [nexusId, code, invitedBy, expiresAt]);
  return rows[0];
}


export async function rejectInvite(code, userId=null) {
  const q = `UPDATE invites SET is_used=true WHERE code=$1 RETURNING *`;
  const { rows } = await pool.query(q, [code]);
  return rows[0];
}

export async function listPendingInvites(userId) {
  // invites where invited_by = userId OR (email matches) - but schema lacks email; we'll use invited_by
  const q = `SELECT * FROM invites WHERE is_used=false AND (invited_by=$1 OR (accepted_by IS NULL AND expires_at > now())) ORDER BY created_at DESC`;
  const { rows } = await pool.query(q, [userId]);
  return rows;
}

