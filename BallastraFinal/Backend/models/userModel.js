import pool from "../config/db.js";

// Find user by email
export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND is_verified = true",
    [email]
  );
  return result.rows[0];
};

export const createUser = async (data) => {
  const { username, name, email, password, avatar_url, is_verified } = data;

  const { rows } = await pool.query(
    `INSERT INTO users (username, name, email, password, avatar_url, is_verified)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING id, username, name, email, avatar_url, is_verified`,
    [username, name, email, password, avatar_url, is_verified]
  );

  return rows[0];
};

export const findUserByUsername = async (username) => {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE username = $1 AND is_verified = true',
    [username]
  );
  return rows[0];
};
/* ================= GOOGLE ================= */

// Find user by Google ID
export const findUserByGoogleId = async (googleId) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE google_id = $1",
    [googleId]
  );
  return result.rows[0];
};

// Attach google id to existing user
export const attachGoogleId = async (userId, googleId) => {
  const result = await pool.query(
    `UPDATE users SET google_id = $1 WHERE id = $2 RETURNING *`,
    [googleId, userId]
  );
  return result.rows[0];
};

// Create user with Google
export const createUserWithGoogle = async (name, email, googleId, avatar_url) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, google_id, avatar_url)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, email, googleId, avatar_url]
  );
  return result.rows[0];
};

export const markUserVerified = async (userId) => {
  await pool.query(
    'UPDATE users SET is_verified=true WHERE id=$1',
    [userId]
  );
};

/* ================= APPLE ================= */

// Find user by Apple ID
export const findUserByAppleId = async (appleId) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE apple_id = $1",
    [appleId]
  );
  return result.rows[0];
};

// Attach apple ID
export const attachAppleId = async (userId, appleId) => {
  const result = await pool.query(
    `UPDATE users SET apple_id = $1 WHERE id = $2 RETURNING *`,
    [appleId, userId]
  );
  return result.rows[0];
};

// Create user using Apple
export const createUserWithApple = async (email, appleId) => {
  const result = await pool.query(
    `INSERT INTO users (email, apple_id)
     VALUES ($1, $2) RETURNING *`,
    [email, appleId]
  );
  return result.rows[0];
};

// Find user by ID
export const findUserById = async (id) => {
  const result = await pool.query(
    "SELECT id, name, email, avatar_url FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

// Update profile
export const updateProfile = async (id, name, avatar_url) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, avatar_url=$2
     WHERE id=$3 RETURNING id, name, email, avatar_url`,
    [name, avatar_url, id]
  );
  return result.rows[0];
};
