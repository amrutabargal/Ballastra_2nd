import db from "../config/db.js";

export async function createMessage(data) {
  const { rows } = await db.query(
    `INSERT INTO channel_messages
     (channel_id, user_id, content, attachments)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [
      data.channel_id,
      data.user_id,
      data.content,
      data.attachments || []
    ]
  );
  return rows[0];
}

export async function getMessages(channelId, limit = 50, offset = 0) {
  const { rows } = await db.query(
    `SELECT * FROM channel_messages
     WHERE channel_id=$1
     ORDER BY created_at ASC
     LIMIT $2 OFFSET $3`,
    [channelId, limit, offset]
  );
  return rows;
}

export async function updateMessage(messageId, content) {
  const { rows } = await db.query(
    `UPDATE channel_messages
     SET content=$2, edited=true
     WHERE id=$1
     RETURNING *`,
    [messageId, content]
  );
  return rows[0];
}

export async function deleteMessage(messageId) {
  await db.query(
    `DELETE FROM channel_messages WHERE id=$1`,
    [messageId]
  );
}

export async function getMessageOwner(messageId) {
  const { rows } = await db.query(
    `SELECT user_id FROM channel_messages WHERE id=$1`,
    [messageId]
  );
  return rows[0]?.user_id;
}
