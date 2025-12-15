// Backend/routes/activityRoutes.js
import express from 'express';
import * as activityCtrl from '../controllers/activityController.js';
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/:nexusId', protect, activityCtrl.listActivity);

export default router;
