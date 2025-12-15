import pool from "../config/db.js";

// Find user by email
export const findUserByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

// Create normal user
export const createUser = async (name, email, password, avatar_url) => {
    const result = await pool.query(
        `INSERT INTO users (name, email, password, avatar_url)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, email, password, avatar_url]
    );
    return result.rows[0];
};

// Find user by Apple ID
export const findUserByAppleId = async (appleId) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE apple_id = $1",
        [appleId]
    );
    return result.rows[0];
};

// Attach apple ID to existing email user
export const attachAppleId = async (userId, appleId) => {
    const result = await pool.query(
        `UPDATE users SET apple_id = $1 WHERE id = $2 RETURNING *`,
        [appleId, userId]
    );
    return result.rows[0];
};

// Create new user using Apple login
export const createUserWithApple = async (email, appleId) => {
    const result = await pool.query(
        `INSERT INTO users (email, apple_id)
         VALUES ($1, $2) RETURNING *`,
        [email, appleId]
    );
    return result.rows[0];
};

// Get user by ID
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
        `UPDATE users SET name = $1, avatar_url = $2
         WHERE id = $3 RETURNING id, name, email, avatar_url`,
        [name, avatar_url, id]
    );
    return result.rows[0];
};
