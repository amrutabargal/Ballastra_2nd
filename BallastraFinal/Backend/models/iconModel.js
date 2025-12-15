import pool from "../config/db.js";

export async function listIcons() {
  const { rows } = await pool.query(
    "SELECT * FROM nexus_icons ORDER BY created_at DESC"
  );
  return rows;
}

export async function createIcon(filename, display_name = null, uploaded_by = null) {
  const query = `
    INSERT INTO nexus_icons (filename, display_name, uploaded_by)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const { rows } = await pool.query(query, [filename, display_name, uploaded_by]);
  return rows[0];
}
