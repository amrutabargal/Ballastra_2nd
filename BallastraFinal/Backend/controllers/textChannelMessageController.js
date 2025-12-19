import * as channelMessageModel from "../models/channelMessageModel.js";
import * as channelModel from "../models/channelModel.js";
import * as membersModel from "../models/membersModel.js";
import { notifyUser } from "../services/notificationService.js";
import { sendNotificationSocket } from "../socket/notification.socket.js";

/**
 * Send message to text channel
 */
export async function sendChannelMessage(req, res, next) {
    try {
        const { channelId } = req.params;
        const { content, attachments = [], mentions = [] } = req.body;

        const channel = await channelModel.getChannelById(channelId);
        if (!channel || channel.type !== "text")
            return res.status(404).json({ success: false, message: "Text channel not found" });

        const isMember = await membersModel.isMember(channel.nexus_id, req.user.id);
        if (!isMember)
            return res.status(403).json({ success: false, message: "Not a member" });


        const settings = channel.settings || {};

        if (settings.locked) {
            return res.status(403).json({
                success: false,
                message: "Channel is locked"
            });
        }

        if (settings.slowMode) {
            // frontend handles timer; backend optional enforcement
        }

        const timeout = await moderationModel.getActiveTimeout(
            channel.nexus_id,
            req.user.id
          );
          
          if (timeout) {
            return res.status(403).json({
              success: false,
              message: "You are timed out"
            });
          }
          

        const message = await channelMessageModel.createMessage({
            channel_id: channelId,
            user_id: req.user.id,
            content,
            attachments
        });

        //Mentions → Discord behavior
        for (const userId of mentions) {
            if (userId === req.user.id) continue;

            const payload = {
                user_id: userId,
                type: "MENTION",
                purpose: "You were mentioned in a channel",
                source: message.id
            };

            const notif = await notifyUser(payload);
            sendNotificationSocket(req.io, userId, notif);
        }

        //Real-time channel message
        req.io.to(channelId).emit("channel_message", message);

        res.status(201).json({ success: true, data: message });
    } catch (err) { next(err); }
}

/**
 * 2️⃣ Get channel messages
 */
export async function getChannelMessages(req, res, next) {
    try {
        const { channelId } = req.params;
        const { limit = 50, offset = 0 } = req.query;

        const messages = await channelMessageModel.getMessages(
            channelId,
            Number(limit),
            Number(offset)
        );

        res.json({ success: true, data: messages });
    } catch (err) { next(err); }
}

/**
 * 3️⃣ Edit message
 */
export async function editChannelMessage(req, res, next) {
    try {
        const { messageId } = req.params;
        const { content } = req.body;

        const owner = await channelMessageModel.getMessageOwner(messageId);
        if (owner !== req.user.id)
            return res.status(403).json({ success: false, message: "Not allowed" });

        const updated = await channelMessageModel.updateMessage(messageId, content);
        res.json({ success: true, data: updated });
    } catch (err) { next(err); }
}

/**
 * 4️⃣ Delete message
 */
export async function deleteChannelMessage(req, res, next) {
    try {
        const { messageId } = req.params;

        const owner = await channelMessageModel.getMessageOwner(messageId);
        if (owner !== req.user.id)
            return res.status(403).json({ success: false, message: "Not allowed" });

        await channelMessageModel.deleteMessage(messageId);
        res.json({ success: true, message: "Message deleted" });
    } catch (err) { next(err); }
}
