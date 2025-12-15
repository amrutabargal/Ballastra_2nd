// Backend/routes/notificationRoutes.js
import express from 'express';
import * as notifCtrl from '../controllers/notificationsController.js';
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/', protect, notifCtrl.listNotifications);
router.put('/:id/read', protect, notifCtrl.markRead);

export default router;
