// Backend/controllers/spacesController.js
import * as spacesModel from '../models/spacesModel.js';
import * as activityModel from '../models/activityModel.js';

export async function createSpace(req, res, next) {
  try {
    const payload = { ...req.body, created_by: req.user.id };
    const space = await spacesModel.createSpace(payload);
    await activityModel.logActivity({ nexus_id: space.nexus_id, user_id: req.user.id, action: 'space_created', meta: { spaceId: space.id } });
    res.status(201).json({ success:true, data: space });
  } catch (err) { next(err); }
}

export async function listSpaces(req, res, next) {
  try {
    const { nexusId } = req.params;
    const list = await spacesModel.listSpacesByNexus(nexusId);
    res.json({ success:true, data: list });
  } catch (err) { next(err); }
}

export async function getSpace(req, res, next) {
  try {
    const { spaceId } = req.params;
    const space = await spacesModel.getSpaceById(spaceId);
    if (!space) return res.status(404).json({ success:false, message: 'Space not found' });
    res.json({ success:true, data: space });
  } catch (err) { next(err); }
}

export async function updateSpace(req, res, next) {
  try {
    const { spaceId } = req.params;
    const updated = await spacesModel.updateSpace(spaceId, req.body);
    await activityModel.logActivity({ nexus_id: updated.nexus_id, user_id: req.user.id, action: 'space_updated', meta: { spaceId } });
    res.json({ success:true, data: updated });
  } catch (err) { next(err); }
}

export async function deleteSpace(req, res, next) {
  try {
    const { spaceId } = req.params;
    const space = await spacesModel.getSpaceById(spaceId);
    if (!space) return res.status(404).json({ success:false, message: 'Space not found' });
    await spacesModel.deleteSpace(spaceId);
    await activityModel.logActivity({ nexus_id: space.nexus_id, user_id: req.user.id, action: 'space_deleted', meta: { spaceId } });
    res.json({ success:true, message: 'Deleted' });
  } catch (err) { next(err); }
}

export async function listSpaceMembersHandler(req, res, next) {
  try {
    const { spaceId } = req.params;
    const rows = await spacesModel.listSpaceMembers(spaceId);
    res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}

export async function updateSpaceSettingsHandler(req, res, next) {
  try {
    const { spaceId } = req.params;
    const settings = req.body; // expect keys: darkMode, blur, visibility, etc.
    // we store settings in settings JSONB column
    const updated = await spacesModel.updateSpace(spaceId, { settings });
    await activityModel.logActivity({ nexus_id: updated.nexus_id, user_id: req.user.id, action: 'space_settings_updated', meta: { settings } });
    res.json({ success:true, data: updated });
  } catch (err) { next(err); }
}