import pool from "../config/db.js";

// Create call entry
export async function createCall({ caller_id, receiver_id, call_type }) {
    const q = `
        INSERT INTO calls (caller_id, receiver_id, call_type, status)
        VALUES ($1,$2,$3,'ringing')
        RETURNING *`;
    const { rows } = await pool.query(q, [caller_id, receiver_id, call_type]);
    return rows[0];
}

// Update call status
export async function updateCallStatus(callId, status) {
    const q = `
        UPDATE calls SET status=$1,
        ended_at = CASE WHEN $1='ended' OR $1='missed' THEN NOW() ELSE ended_at END
        WHERE id=$2 RETURNING *`;
    const { rows } = await pool.query(q, [status, callId]);
    return rows[0];
}

// Get call by ID
export async function getCallById(callId) {
    const { rows } = await pool.query(`SELECT * FROM calls WHERE id=$1`, [callId]);
    return rows[0];
}

// List user's call history
export async function listCalls(userId, limit = 50, offset = 0) {
    const q = `
      SELECT c.*, 
      u1.name AS caller_name, u1.avatar_url AS caller_avatar,
      u2.name AS receiver_name, u2.avatar_url AS receiver_avatar
      FROM calls c
      LEFT JOIN users u1 ON u1.id = c.caller_id
      LEFT JOIN users u2 ON u2.id = c.receiver_id
      WHERE caller_id = $1 OR receiver_id = $1
      ORDER BY started_at DESC
      LIMIT $2 OFFSET $3`;
    const { rows } = await pool.query(q, [userId, limit, offset]);
    return rows;
}

// Save SDPs for WebRTC
export async function saveSDP(call_id, offer = null, answer = null) {
    const q = `
        INSERT INTO call_sessions (call_id, sdp_offer, sdp_answer)
        VALUES ($1,$2,$3) RETURNING *`;
    const { rows } = await pool.query(q, [call_id, offer, answer]);
    return rows[0];
}

// Add ICE candidates
export async function addIceCandidate(sessionId, candidate) {
    const q = `
        UPDATE call_sessions
        SET ice_candidates = ice_candidates || $1::jsonb
        WHERE id=$2
        RETURNING *`;
    const { rows } = await pool.query(q, [JSON.stringify([candidate]), sessionId]);
    return rows[0];
}
