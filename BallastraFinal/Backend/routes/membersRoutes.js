// Backend/routes/membersRoutes.js
import express from 'express';
import * as membersCtrl from '../controllers/membersController.js';
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// List members
router.get('/:nexusId', protect, membersCtrl.listMembers);

// Add member
router.post('/:nexusId', protect, membersCtrl.addMember);

// Change role
router.put('/:nexusId/:memberId/role', protect, membersCtrl.changeRole);

// Remove member
router.delete('/:nexusId/:memberId', protect, membersCtrl.removeMember);

// Leave nexus (self)
router.post('/:nexusId/leave', protect, membersCtrl.leaveNexus);

export default router;
