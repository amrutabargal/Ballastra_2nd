// Backend/models/membersModel.js
import pool from '../config/db.js';

export async function listMembers(nexusId) {
  const q = `SELECT nm.*, u.* 
             FROM nexus_members nm
             LEFT JOIN users u ON u.id = nm.user_id
             WHERE nm.nexus_id = $1
             ORDER BY nm.joined_at DESC`;
  const { rows } = await pool.query(q, [nexusId]);
  return rows;
}

export async function addMember(nexusId, userId, role = 'member') {
  const q = `INSERT INTO nexus_members (nexus_id, user_id, role) 
             VALUES ($1,$2,$3) RETURNING *`;
  const { rows } = await pool.query(q, [nexusId, userId, role]);
  return rows[0];
}

export async function removeMember(nexusId, memberId) {
  const q = `DELETE FROM nexus_members WHERE nexus_id=$1 AND user_id=$2 RETURNING *`;
  const { rows } = await pool.query(q, [nexusId, memberId]);
  return rows[0];
}

export async function changeRole(nexusId, memberId, role) {
  const q = `UPDATE nexus_members SET role=$1 WHERE nexus_id=$2 AND user_id=$3 RETURNING *`;
  const { rows } = await pool.query(q, [role, nexusId, memberId]);
  return rows[0];
}

export async function leaveNexus(nexusId, userId) {
  return removeMember(nexusId, userId);
}
