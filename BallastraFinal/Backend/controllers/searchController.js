// Backend/controllers/searchController.js
import pool from '../config/db.js';

export async function searchUsers(req, res, next) {
  try {
    const q = req.query.q || '';
    const sql = `SELECT id, name, email FROM users WHERE name ILIKE $1 OR email ILIKE $1 LIMIT 30`;
    const { rows } = await pool.query(sql, [`%${q}%`]);
    res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}

export async function searchNexus(req, res, next) {
  try {
    const q = req.query.q || '';
    const sql = `SELECT id, name, description FROM nexus WHERE name ILIKE $1 OR description ILIKE $1 LIMIT 30`;
    const { rows } = await pool.query(sql, [`%${q}%`]);
    res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}
