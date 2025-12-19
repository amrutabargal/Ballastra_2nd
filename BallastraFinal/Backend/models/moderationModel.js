import db from "../config/db.js";

export async function banUser(nexusId, userId, adminId, reason) {
  await db.query(
    `INSERT INTO bans (nexus_id, user_id, banned_by, reason)
     VALUES ($1,$2,$3,$4)`,
    [nexusId, userId, adminId, reason]
  );
}

export async function unbanUser(nexusId, userId) {
  await db.query(
    `DELETE FROM bans WHERE nexus_id=$1 AND user_id=$2`,
    [nexusId, userId]
  );
}

export async function isBanned(nexusId, userId) {
  const { rows } = await db.query(
    `SELECT 1 FROM bans WHERE nexus_id=$1 AND user_id=$2`,
    [nexusId, userId]
  );
  return rows.length > 0;
}

export async function timeoutUser(nexusId, userId, expiresAt, adminId) {
  await db.query(
    `INSERT INTO timeouts (nexus_id, user_id, expires_at, created_by)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (nexus_id, user_id)
     DO UPDATE SET expires_at=$3`,
    [nexusId, userId, expiresAt, adminId]
  );
}

export async function removeTimeout(nexusId, userId) {
  await db.query(
    `DELETE FROM timeouts WHERE nexus_id=$1 AND user_id=$2`,
    [nexusId, userId]
  );
}

export async function getActiveTimeout(nexusId, userId) {
  const { rows } = await db.query(
    `SELECT * FROM timeouts
     WHERE nexus_id=$1 AND user_id=$2 AND expires_at > NOW()`,
    [nexusId, userId]
  );
  return rows[0];
}
