import * as inviteModel from "../models/inviteModel.js";
import * as nexusModel from "../models/nexusModel.js";
import * as membersModel from "../models/membersModel.js";
import crypto from "crypto";
import { sendEmail } from "../services/emailService.js";
import { notifyUser } from "../services/notificationService.js";
import { sendNotificationSocket } from "../socket/notification.socket.js";

function makeCode() {
  return crypto.randomBytes(12).toString("base64url");
}

/**
 * Generate invite (link / QR / scanner)
 * Discord-like: reusable or expiring
 */
export async function generateInvite(req, res, next) {
  try {
    const { nexusId, expiresInHours = null, maxUses = null } = req.body;

    const nexus = await nexusModel.getNexusById(nexusId);
    if (!nexus)
      return res.status(404).json({ success: false, message: "Nexus not found" });

    // only admin / owner can invite
    const isMember = await membersModel.isAdminOrOwner(nexusId, req.user.id);
    if (!isMember)
      return res.status(403).json({ success: false, message: "Not allowed" });

    const code = makeCode();
    const expiresAt = expiresInHours
      ? new Date(Date.now() + expiresInHours * 3600 * 1000)
      : null;

    const invite = await inviteModel.generateInvite({
      nexus_id: nexusId,
      code,
      created_by: req.user.id,
      expires_at: expiresAt,
      max_uses: maxUses
    });

    const link = `${process.env.APP_URL}/invite/accept?code=${invite.code}`;

    res.status(201).json({
      success: true,
      data: {
        code: invite.code,
        link,
        expiresAt: invite.expires_at,
        maxUses: invite.max_uses
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 Send invite via email (Discord-style)
 */
export async function sendInviteByEmail(req, res, next) {
  try {
    const { nexusId, email, expiresInHours } = req.body;

    const nexus = await nexusModel.getNexusById(nexusId);
    if (!nexus)
      return res.status(404).json({ success: false, message: "Nexus not found" });

    const code = makeCode();
    const expiresAt = expiresInHours
      ? new Date(Date.now() + expiresInHours * 3600 * 1000)
      : null;

    const invite = await inviteModel.generateInvite({
      nexus_id: nexusId,
      code,
      created_by: req.user.id,
      expires_at: expiresAt
    });

    const link = `${process.env.APP_URL}/invite/accept?code=${invite.code}`;

    await sendEmail({
      to: email,
      subject: `Invite to join ${nexus.name}`,
      html: `
        <p>${req.user.username} invited you to join <b>${nexus.name}</b>.</p>
        <p><a href="${link}">Accept Invite</a></p>
        <p>Invite code: <b>${invite.code}</b></p>
      `
    });

    res.json({ success: true, message: "Invite email sent" });
  } catch (err) {
    next(err);
  }
}

/**
 * Accept invite (link / QR / scanner)
 */
export async function acceptInvite(req, res, next) {
  try {
    const { code } = req.body;

    const invite = await inviteModel.getInviteByCode(code);
    if (!invite)
      return res.status(404).json({ success: false, message: "Invite not found" });

    if (invite.expires_at && new Date(invite.expires_at) < new Date())
      return res.status(400).json({ success: false, message: "Invite expired" });

    if (invite.max_uses && invite.uses_count >= invite.max_uses)
      return res.status(400).json({ success: false, message: "Invite limit reached" });

    //BAN CHECK (THIS IS THE ANSWER)
    const banned = await moderationModel.isBanned(
      invite.nexus_id,
      req.user.id
    );

    if (banned) {
      return res.status(403).json({
        success: false,
        message: "You are banned from this server"
      });
    }

    const alreadyMember = await membersModel.isMember(
      invite.nexus_id,
      req.user.id
    );
    if (alreadyMember)
      return res.status(400).json({ success: false, message: "Already a member" });

    // join nexus
    await membersModel.addMember(invite.nexus_id, req.user.id, "member");

    // update invite usage
    await inviteModel.markInviteUsed(code, req.user.id);

    //notify inviter
    const payload = {
      user_id: invite.created_by,
      type: "INVITE_ACCEPTED",
      purpose: `${req.user.username} joined your space`,
      source: invite.nexus_id
    };

    const notif = await notifyUser(payload);
    sendNotificationSocket(req.io, invite.created_by, notif);

    res.json({ success: true, message: "Invite accepted" });
  } catch (err) {
    next(err);
  }
}


/**
 * Reject invite
 */
export async function rejectInvite(req, res, next) {
  try {
    const { code } = req.body;

    const invite = await inviteModel.getInviteByCode(code);
    if (!invite)
      return res.status(404).json({ success: false, message: "Invite not found" });

    await inviteModel.rejectInvite(code, req.user.id);

    res.json({ success: true, message: "Invite rejected" });
  } catch (err) {
    next(err);
  }
}

/**
 * List pending invites (Notifications screen)
 */
export async function listPendingInvites(req, res, next) {
  try {
    const rows = await inviteModel.listPendingInvites(req.user.id);
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}
