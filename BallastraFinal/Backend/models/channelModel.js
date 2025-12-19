import db from "../config/db.js";

export async function createChannel(data) {
    const { rows } = await db.query(
        `INSERT INTO channels
     (nexus_id, space_id, name, type, position, settings, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
        [
            data.nexus_id,
            data.space_id,
            data.name,
            data.type,
            data.position || 0,
            data.settings || {},
            data.created_by
        ]
    );
    return rows[0];
}

export async function listChannels(spaceId) {
    const { rows } = await db.query(
        `SELECT * FROM channels
     WHERE space_id=$1
     ORDER BY position ASC`,
        [spaceId]
    );
    return rows;
}

export async function getChannelById(channelId) {
    const { rows } = await db.query(
        `SELECT * FROM channels WHERE id=$1`,
        [channelId]
    );
    return rows[0];
}

export async function updateChannel(channelId, data) {
    const { rows } = await db.query(
        `UPDATE channels
     SET name=$2, settings=$3
     WHERE id=$1
     RETURNING *`,
        [channelId, data.name, data.settings]
    );
    return rows[0];
}

export async function deleteChannel(channelId) {
    await db.query(`DELETE FROM channels WHERE id=$1`, [channelId]);
}

export async function updateChannelSettings(channelId, settings) {
    const { rows } = await db.query(
        `UPDATE channels
       SET settings = settings || $2
       WHERE id = $1
       RETURNING *`,
        [channelId, settings]
    );
    return rows[0];
}

export async function getChannelSettings(channelId) {
    const { rows } = await db.query(
        `SELECT settings FROM channels WHERE id = $1`,
        [channelId]
    );
    return rows[0]?.settings || {};
}

