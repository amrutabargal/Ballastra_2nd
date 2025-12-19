import * as channelModel from "../models/channelModel.js";
import * as membersModel from "../models/membersModel.js";

/**
 * Update channel permissions (ADMIN / OWNER)
 */
export async function updateChannelPermissions(req, res, next) {
  try {
    const { channelId } = req.params;
    const permissions = req.body;

    const channel = await channelModel.getChannelById(channelId);
    if (!channel)
      return res.status(404).json({ success:false, message:"Channel not found" });

    const allowed = await membersModel.isAdminOrOwner(channel.nexus_id, req.user.id);
    if (!allowed)
      return res.status(403).json({ success:false, message:"Permission denied" });

    const updated = await channelModel.updateChannelSettings(channelId, permissions);

    res.json({ success:true, data: updated });
  } catch (err) {
    next(err);
  }
}
