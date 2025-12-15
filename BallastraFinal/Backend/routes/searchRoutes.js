// Backend/routes/searchRoutes.js
import express from 'express';
import * as searchCtrl from '../controllers/searchController.js';
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/users', protect, searchCtrl.searchUsers);
router.get('/nexus', protect, searchCtrl.searchNexus);

export default router;
