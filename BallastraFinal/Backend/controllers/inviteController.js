import * as inviteModel from "../models/inviteModel.js";
import * as nexusModel from "../models/nexusModel.js";
import crypto from "crypto";
import { sendEmail } from "../services/emailService.js";
import * as membersModel from "../models/membersModel.js";

function makeCode() {
  return crypto.randomBytes(12).toString('base64url');
}

export async function generateInvite(req, res, next) { // keep existing functionality
  try {
    const { nexusId, expiresInHours } = req.body;
    const nexus = await nexusModel.getNexusById(nexusId);
    if (!nexus) return res.status(404).json({ success:false, message:'Nexus not found' });

    const code = makeCode();
    let expiresAt = null;
    if (expiresInHours) expiresAt = new Date(Date.now() + expiresInHours*3600*1000);
    const invite = await inviteModel.generateInvite(nexusId, code, req.user.id, expiresAt);
    res.status(201).json({ success:true, data: { code: invite.code, expiresAt: invite.expires_at } });
  } catch (err) { next(err); }
}

export async function sendInviteByEmail(req, res, next) {
  try {
    const { nexusId, email, message, expiresInHours } = req.body;
    const nexus = await nexusModel.getNexusById(nexusId);
    if (!nexus) return res.status(404).json({ success:false, message:'Nexus not found' });

    const code = makeCode();
    let expiresAt = null;
    if (expiresInHours) expiresAt = new Date(Date.now() + expiresInHours*3600*1000);
    const invite = await inviteModel.generateInvite(nexusId, code, req.user.id, expiresAt);

    const link = `${process.env.APP_URL}/invite/accept?code=${invite.code}`; // frontend route to accept
    await sendEmail({
      to: email,
      subject: `Invite to join ${nexus.name}`,
      text: `${req.user.name || 'Someone'} invited you to join ${nexus.name}. Accept: ${link}`,
      html: `<p>${req.user.name || 'Someone'} invited you to join <b>${nexus.name}</b>.</p><p>Click <a href="${link}">here</a> to accept. Code: <b>${invite.code}</b></p>`
    });

    res.json({ success:true, message:'Invite sent' });
  } catch (err) { next(err); }
}

export async function acceptInvite(req, res, next) {
  try {
    const { code } = req.body;
    const invite = await inviteModel.getInviteByCode(code);
    if (!invite) return res.status(404).json({ success:false, message:'Invite not found' });
    if (invite.is_used) return res.status(400).json({ success:false, message:'Invite already used' });
    if (invite.expires_at && new Date(invite.expires_at) < new Date()) return res.status(400).json({ success:false, message:'Invite expired' });

    const accepted = await inviteModel.acceptInvite(code, req.user.id);
    await nexusModel.addMember(invite.nexus_id, req.user.id, 'member'); // add to nexus_members
    res.json({ success:true, message:'Invite accepted', data: accepted });
  } catch (err) { next(err); }
}

export async function rejectInvite(req, res, next) {
  try {
    const { code } = req.body;
    const invite = await inviteModel.getInviteByCode(code);
    if (!invite) return res.status(404).json({ success:false, message:'Invite not found' });

    await inviteModel.rejectInvite(code);
    res.json({ success:true, message:'Invite rejected' });
  } catch (err) { next(err); }
}

export async function listPendingInvites(req, res, next) {
  try {
    const rows = await inviteModel.listPendingInvites(req.user.id);
    res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}
