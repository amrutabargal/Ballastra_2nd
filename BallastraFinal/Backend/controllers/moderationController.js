import * as moderationModel from "../models/moderationModel.js";
import * as membersModel from "../models/membersModel.js";

/**
 * Kick user
 */
export async function kickUser(req, res, next) {
  try {
    const { nexusId, userId } = req.body;

    const allowed = await membersModel.isAdminOrOwner(nexusId, req.user.id);
    if (!allowed)
      return res.status(403).json({ success:false, message:"Permission denied" });

    await membersModel.removeMember(nexusId, userId);

    res.json({ success:true, message:"User kicked" });
  } catch (err) { next(err); }
}

/**
 * Ban user
 */
export async function banUser(req, res, next) {
  try {
    const { nexusId, userId, reason } = req.body;

    const allowed = await membersModel.isAdminOrOwner(nexusId, req.user.id);
    if (!allowed)
      return res.status(403).json({ success:false, message:"Permission denied" });

    await moderationModel.banUser(nexusId, userId, req.user.id, reason);
    await membersModel.removeMember(nexusId, userId);

    res.json({ success:true, message:"User banned" });
  } catch (err) { next(err); }
}

/**
 * Unban user
 */
export async function unbanUser(req, res, next) {
  try {
    const { nexusId, userId } = req.body;

    const allowed = await membersModel.isAdminOrOwner(nexusId, req.user.id);
    if (!allowed)
      return res.status(403).json({ success:false, message:"Permission denied" });

    await moderationModel.unbanUser(nexusId, userId);

    res.json({ success:true, message:"User unbanned" });
  } catch (err) { next(err); }
}

/**
 * Timeout user
 */
export async function timeoutUser(req, res, next) {
  try {
    const { nexusId, userId, minutes } = req.body;

    const allowed = await membersModel.isAdminOrOwner(nexusId, req.user.id);
    if (!allowed)
      return res.status(403).json({ success:false, message:"Permission denied" });

    const expiresAt = new Date(Date.now() + minutes * 60 * 1000);

    await moderationModel.timeoutUser(
      nexusId,
      userId,
      expiresAt,
      req.user.id
    );

    res.json({ success:true, message:"User timed out" });
  } catch (err) { next(err); }
}

/**
 * Remove timeout
 */
export async function removeTimeout(req, res, next) {
  try {
    const { nexusId, userId } = req.body;

    const allowed = await membersModel.isAdminOrOwner(nexusId, req.user.id);
    if (!allowed)
      return res.status(403).json({ success:false, message:"Permission denied" });

    await moderationModel.removeTimeout(nexusId, userId);

    res.json({ success:true, message:"Timeout removed" });
  } catch (err) { next(err); }
}
