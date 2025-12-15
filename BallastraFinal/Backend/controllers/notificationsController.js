// Backend/controllers/notificationsController.js
import * as notificationModel from '../models/notificationModel.js';

export async function listNotifications(req, res, next) {
  try {
    const rows = await notificationModel.listNotifications(req.user.id);
    res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}

export async function markRead(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await notificationModel.markRead(id);
    res.json({ success:true, data: updated });
  } catch (err) { next(err); }
}
