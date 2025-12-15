// Backend/models/spacesModel.js
import pool from '../config/db.js';

export async function createSpace({ nexus_id, name, mode='public', description, settings = {}, created_by }) {
  const q = `INSERT INTO spaces (nexus_id, name, mode, description, settings, created_by)
             VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
  const { rows } = await pool.query(q, [nexus_id, name, mode, description, settings, created_by]);
  return rows[0];
}

export async function listSpacesByNexus(nexusId) {
  const q = `SELECT * FROM spaces WHERE nexus_id=$1 ORDER BY created_at DESC`;
  const { rows } = await pool.query(q, [nexusId]);
  return rows;
}

export async function getSpaceById(id) {
  const { rows } = await pool.query('SELECT * FROM spaces WHERE id=$1', [id]);
  return rows[0];
}

export async function updateSpace(id, fields = {}) {
  const keys = Object.keys(fields);
  if (!keys.length) return getSpaceById(id);
  const set = keys.map((k,i) => `${k}=$${i+1}`).join(', ');
  const vals = keys.map(k => fields[k]);
  vals.push(id);
  const q = `UPDATE spaces SET ${set}, updated_at = now() WHERE id=$${vals.length} RETURNING *`;
  const { rows } = await pool.query(q, vals);
  return rows[0];
}

export async function deleteSpace(id) {
  await pool.query('DELETE FROM spaces WHERE id=$1', [id]);
  return;
}


export async function listSpaceMembers(spaceId) {
  // spaces don't store members directly; members are on nexus. We'll join space->nexus->nexus_members
  const q = `
    SELECT nm.user_id, nm.role, nm.joined_at, u.name, u.email, u.avatar
    FROM spaces s
    JOIN nexus_members nm ON nm.nexus_id = s.nexus_id
    LEFT JOIN users u ON u.id = nm.user_id
    WHERE s.id = $1
    ORDER BY nm.joined_at DESC
  `;
  const { rows } = await pool.query(q, [spaceId]);
  return rows;
}
