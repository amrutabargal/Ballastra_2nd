// Backend/controllers/activityController.js
import * as activityModel from '../models/activityModel.js';

export async function listActivity(req, res, next) {
  try {
    const { nexusId } = req.params;
    const rows = await activityModel.listActivity(nexusId);
    res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}
