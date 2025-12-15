// Backend/controllers/membersController.js
import * as membersModel from '../models/membersModel.js';
import * as activityModel from '../models/activityModel.js';

export async function listMembers(req, res, next) {
  try {
    const { nexusId } = req.params;
    const rows = await membersModel.listMembers(nexusId);
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

export async function addMember(req, res, next) {
  try {
    const { nexusId } = req.params;
    const { userId, role } = req.body;
    const added = await membersModel.addMember(nexusId, userId, role);
    await activityModel.logActivity({ nexus_id: nexusId, user_id: req.user.id, action: 'member_added', meta: { addedUser: userId } });
    res.status(201).json({ success:true, data: added });
  } catch (err) { next(err); }
}

export async function removeMember(req, res, next) {
  try {
    const { nexusId, memberId } = req.params;
    const removed = await membersModel.removeMember(nexusId, memberId);
    await activityModel.logActivity({ nexus_id: nexusId, user_id: req.user.id, action: 'member_removed', meta: { removedUser: memberId } });
    res.json({ success:true, data: removed });
  } catch (err) { next(err); }
}

export async function changeRole(req, res, next) {
  try {
    const { nexusId, memberId } = req.params;
    const { role } = req.body;
    const changed = await membersModel.changeRole(nexusId, memberId, role);
    await activityModel.logActivity({ nexus_id: nexusId, user_id: req.user.id, action: 'role_changed', meta: { user: memberId, role } });
    res.json({ success:true, data: changed });
  } catch (err) { next(err); }
}

export async function leaveNexus(req, res, next) {
  try {
    const { nexusId } = req.params;
    const left = await membersModel.leaveNexus(nexusId, req.user.id);
    await activityModel.logActivity({ nexus_id: nexusId, user_id: req.user.id, action: 'left_nexus', meta: {} });
    res.json({ success:true, data: left });
  } catch (err) { next(err); }
}
