// Backend/routes/pulseRoutes.js
import express from 'express';
import * as pulseCtrl from '../controllers/pulseController.js';
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/spaces/:spaceId', protect, pulseCtrl.createPulse);
router.get('/spaces/:spaceId', protect, pulseCtrl.getPulses);

export default router;
