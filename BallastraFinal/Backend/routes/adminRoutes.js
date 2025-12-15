// Backend/routes/adminRoutes.js
import express from 'express';
import * as adminCtrl from '../controllers/adminController.js';
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.put('/nexus/:nexusId/privacy', protect, adminCtrl.updatePrivacy);
router.put('/nexus/:nexusId/transfer', protect, adminCtrl.transferOwnership);

export default router;
