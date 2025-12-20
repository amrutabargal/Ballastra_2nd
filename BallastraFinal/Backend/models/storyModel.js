import pool from "../config/db.js";

export async function createStory(userId) {
  const { rows } = await pool.query(
    `INSERT INTO stories (user_id, expires_at)
     VALUES ($1, NOW() + INTERVAL '24 HOURS')
     RETURNING *`,
    [userId]
  );
  return rows[0];
}

export async function addStoryItem(storyId, media_url, media_type) {
  const { rows } = await pool.query(
    `INSERT INTO story_items (story_id, media_url, media_type)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [storyId, media_url, media_type]
  );
  return rows[0];
}

export async function getActiveStories() {
  const { rows } = await pool.query(`
    SELECT s.*, u.username,
      json_agg(i.* ORDER BY i.created_at) AS items
    FROM stories s
    JOIN users u ON u.id = s.user_id
    JOIN story_items i ON i.story_id = s.id
    WHERE s.expires_at > NOW()
    GROUP BY s.id, u.username
    ORDER BY s.created_at DESC
  `);
  return rows;
}

export async function getMyStories(userId) {
  const { rows } = await pool.query(`
    SELECT s.*, json_agg(i.*) AS items
    FROM stories s
    JOIN story_items i ON i.story_id = s.id
    WHERE s.user_id = $1 AND s.expires_at > NOW()
    GROUP BY s.id
  `, [userId]);
  return rows;
}

export async function deleteStory(storyId, userId) {
  await pool.query(
    `DELETE FROM stories WHERE id=$1 AND user_id=$2`,
    [storyId, userId]
  );
}
