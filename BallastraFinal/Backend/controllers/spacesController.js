import * as spacesModel from "../models/spacesModel.js";
import * as activityModel from "../models/activityModel.js";
import * as membersModel from "../models/membersModel.js";

/**
 * 1️⃣ Create Space (Discord Category)
 * Only ADMIN / OWNER
 */
export async function createSpace(req, res, next) {
  try {
    const { nexusId, name, description, visibility = "public", settings = {} } = req.body;

    const allowed = await membersModel.isAdminOrOwner(nexusId, req.user.id);
    if (!allowed)
      return res.status(403).json({ success: false, message: "Permission denied" });

    const space = await spacesModel.createSpace({
      nexus_id: nexusId,
      name,
      description,
      visibility,
      settings,
      created_by: req.user.id
    });

    await activityModel.logActivity({
      nexus_id: nexusId,
      user_id: req.user.id,
      action: "space_created",
      meta: { spaceId: space.id }
    });

    res.status(201).json({ success: true, data: space });
  } catch (err) {
    next(err);
  }
}

/**
 * 2️⃣ List Spaces in a Nexus (Category list)
 */
export async function listSpaces(req, res, next) {
  try {
    const { nexusId } = req.params;

    const isMember = await membersModel.isMember(nexusId, req.user.id);
    if (!isMember)
      return res.status(403).json({ success: false, message: "Not a member" });

    const spaces = await spacesModel.listSpacesByNexus(nexusId);
    res.json({ success: true,data: spaces });
  } catch (err) {
    next(err);
  }
}

/**
 * 3️⃣ Get single Space
 */
export async function getSpace(req, res, next) {
  try {
    const { spaceId } = req.params;
    const space = await spacesModel.getSpaceById(spaceId);

    if (!space)
      return res.status(404).json({ success: false, message: "Space not found" });

    res.json({ success: true, data: space });
  } catch (err) {
    next(err);
  }
}

/**
 * 4️⃣ Update Space (Rename / reorder / visibility)
 * Only ADMIN / OWNER
 */
export async function updateSpace(req, res, next) {
  try {
    const { spaceId } = req.params;
    const space = await spacesModel.getSpaceById(spaceId);

    if (!space)
      return res.status(404).json({ success: false, message: "Space not found" });

    const allowed = await membersModel.isAdminOrOwner(space.nexus_id, req.user.id);
    if (!allowed)
      return res.status(403).json({ success: false, message: "Permission denied" });

    const updated = await spacesModel.updateSpace(spaceId, req.body);

    await activityModel.logActivity({
      nexus_id: space.nexus_id,
      user_id: req.user.id,
      action: "space_updated",
      meta: { spaceId }
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

/**
 * 5️⃣ Delete Space (Category)
 * Only OWNER
 */
export async function deleteSpace(req, res, next) {
  try {
    const { spaceId } = req.params;
    const space = await spacesModel.getSpaceById(spaceId);

    if (!space)
      return res.status(404).json({ success: false, message: "Space not found" });

    const isOwner = await membersModel.isOwner(space.nexus_id, req.user.id);
    if (!isOwner)
      return res.status(403).json({ success: false, message: "Only owner can delete space" });

    await spacesModel.deleteSpace(spaceId);

    await activityModel.logActivity({
      nexus_id: space.nexus_id,
      user_id: req.user.id,
      action: "space_deleted",
      meta: { spaceId }
    });

    res.json({ success: true, message: "Space deleted" });
  } catch (err) {
    next(err);
  }
}

/**
 * 6️⃣ List members who can see this space
 */
export async function listSpaceMembersHandler(req, res, next) {
  try {
    const { spaceId } = req.params;
    const rows = await spacesModel.listSpaceMembers(spaceId);
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

/**
 * 7️⃣ Update Space Settings (mute, visibility, permissions)
 * ADMIN / OWNER only
 */
export async function updateSpaceSettingsHandler(req, res, next) {
  try {
    const { spaceId } = req.params;
    const space = await spacesModel.getSpaceById(spaceId);

    if (!space)
      return res.status(404).json({ success: false, message: "Space not found" });

    const allowed = await membersModel.isAdminOrOwner(space.nexus_id, req.user.id);
    if (!allowed)
      return res.status(403).json({ success: false, message: "Permission denied" });

    const updated = await spacesModel.updateSpace(spaceId, {
      settings: req.body
    });

    await activityModel.logActivity({
      nexus_id: space.nexus_id,
      user_id: req.user.id,
      action: "space_settings_updated",
      meta: { settings: req.body }
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}
