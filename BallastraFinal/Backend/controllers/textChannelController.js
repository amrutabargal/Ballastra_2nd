import * as channelModel from "../models/channelModel.js";
import * as membersModel from "../models/membersModel.js";

/**
 * Create Text Channel
 */
export async function createTextChannel(req, res, next) {
  try {
    const { spaceId } = req.params;
    const { name } = req.body;

    const allowed = await membersModel.isAdminOrOwner(req.body.nexusId, req.user.id);
    if (!allowed)
      return res.status(403).json({ success:false, message:"Permission denied" });

    const channel = await channelModel.createChannel({
      nexus_id: req.body.nexusId,
      space_id: spaceId,
      name,
      type: "text",
      created_by: req.user.id
    });

    res.status(201).json({ success:true, data: channel });
  } catch (err) { next(err); }
}

/**
 * List Text Channels
 */
export async function listTextChannels(req, res, next) {
  try {
    const { spaceId } = req.params;
    const channels = await channelModel.listChannels(spaceId);
    res.json({
      success:true,
      data: channels.filter(c => c.type === "text")
    });
  } catch (err) { next(err); }
}

/**
 * Delete Text Channel
 */
export async function deleteTextChannel(req, res, next) {
  try {
    const { channelId } = req.params;
    await channelModel.deleteChannel(channelId);
    res.json({ success:true, message:"Text channel deleted" });
  } catch (err) { next(err); }
}
