// Backend/controllers/adminController.js
import pool from '../config/db.js';
import * as nexusModel from '../models/nexusModel.js';
import * as activityModel from '../models/activityModel.js';

export async function updatePrivacy(req, res, next) {
  try {
    const { nexusId } = req.params;
    const { is_public } = req.body;
    const updated = await nexusModel.updateNexus(nexusId, { is_public });
    await activityModel.logActivity({ nexus_id: nexusId, user_id: req.user.id, action: 'privacy_updated', meta: { is_public } });
    res.json({ success:true, data: updated });
  } catch (err) { next(err); }
}

export async function transferOwnership(req, res, next) {
  try {
    const { nexusId } = req.params;
    const { newOwnerId } = req.body;
    // make sure newOwner is member, update nexus.created_by, and set roles
    await nexusModel.updateNexus(nexusId, { created_by: newOwnerId });
    // update roles: set previous owner to admin/member, set new owner to owner
    await pool.query('UPDATE nexus_members SET role = $1 WHERE nexus_id = $2 AND role = $3', ['member', nexusId, 'owner']); // demote old owner
    await pool.query('UPDATE nexus_members SET role = $1 WHERE nexus_id = $2 AND user_id = $3', ['owner', nexusId, newOwnerId]);
    await activityModel.logActivity({ nexus_id: nexusId, user_id: req.user.id, action: 'ownership_transferred', meta: { newOwnerId } });
    res.json({ success:true, message: 'Ownership transferred' });
  } catch (err) { next(err); }
}
