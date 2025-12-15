// Backend/models/orbitModel.js
import pool from "../config/db.js";

/**
 * Insert follow (user -> target)
 */
export async function follow(userId, targetId) {
  if (userId === targetId) throw new Error("Cannot follow yourself");
  const q = `
    INSERT INTO orbits (user_id, target_id)
    VALUES ($1,$2)
    ON CONFLICT (user_id, target_id) DO UPDATE SET status = 'active'
    RETURNING *`;
  const { rows } = await pool.query(q, [userId, targetId]);
  return rows[0];
}

/**
 * Remove follow (user -> target)
 */
export async function unfollow(userId, targetId) {
  const q = `DELETE FROM orbits WHERE user_id=$1 AND target_id=$2 RETURNING *`;
  const { rows } = await pool.query(q, [userId, targetId]);
  return rows[0];
}

/**
 * Get users who follow me (Orbits)
 */
export async function getOrbits(userId, limit = 100, offset = 0) {
  const q = `
    SELECT o.*, u.id as user_id, u.name, u.email, u.avatar
    FROM orbits o
    JOIN users u ON u.id = o.user_id
    WHERE o.target_id = $1
    ORDER BY o.created_at DESC
    LIMIT $2 OFFSET $3`;
  const { rows } = await pool.query(q, [userId, limit, offset]);
  return rows;
}

/**
 * Get users I follow (Obitors)
 */
export async function getObitors(userId, limit = 100, offset = 0) {
  const q = `
    SELECT o.*, u.id as user_id, u.name, u.email, u.avatar
    FROM orbits o
    JOIN users u ON u.id = o.target_id
    WHERE o.user_id = $1
    ORDER BY o.created_at DESC
    LIMIT $2 OFFSET $3`;
  const { rows } = await pool.query(q, [userId, limit, offset]);
  return rows;
}

/**
 * Check if userId follows targetId
 */
export async function isFollowing(userId, targetId) {
  const q = `SELECT 1 FROM orbits WHERE user_id=$1 AND target_id=$2 LIMIT 1`;
  const { rowCount } = await pool.query(q, [userId, targetId]);
  return rowCount > 0;
}

/**
 * Check mutual follow (both sides)
 */
export async function isMutual(userA, userB) {
  const q = `
    SELECT
      (EXISTS (SELECT 1 FROM orbits WHERE user_id = $1 AND target_id = $2)) as a_to_b,
      (EXISTS (SELECT 1 FROM orbits WHERE user_id = $2 AND target_id = $1)) as b_to_a
  `;
  const { rows } = await pool.query(q, [userA, userB]);
  if (!rows.length) return false;
  return rows[0].a_to_b && rows[0].b_to_a;
}

/**
 * Get mutuals for a user (users who follow each other)
 */
export async function getMutuals(userId, limit = 100, offset = 0) {
  const q = `
    SELECT u.id, u.name, u.email, u.avatar, o.created_at as followed_at
    FROM orbits o
    JOIN users u ON u.id = o.user_id
    WHERE o.target_id = $1
      AND EXISTS (SELECT 1 FROM orbits o2 WHERE o2.user_id = $1 AND o2.target_id = o.user_id)
    ORDER BY o.created_at DESC
    LIMIT $2 OFFSET $3
  `;
  const { rows } = await pool.query(q, [userId, limit, offset]);
  return rows;
}
