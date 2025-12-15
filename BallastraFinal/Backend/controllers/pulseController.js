// Backend/controllers/pulseController.js
import * as pulseModel from '../models/pulseModel.js';

export async function createPulse(req, res, next) {
  try {
    const { spaceId } = req.params;
    const payload = { space_id: spaceId, user_id: req.user.id, message: req.body.message, metadata: req.body.metadata || {} };
    const p = await pulseModel.createPulse(payload);
    res.status(201).json({ success:true, data: p });
  } catch (err) { next(err); }
}

export async function getPulses(req, res, next) {
  try {
    const { spaceId } = req.params;
    const rows = await pulseModel.getPulses(spaceId);
    res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}
