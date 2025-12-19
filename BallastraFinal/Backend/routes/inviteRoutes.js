import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  generateInvite,
  sendInviteByEmail,
  acceptInvite,
  rejectInvite,
  listPendingInvites
} from "../controllers/inviteController.js";

const router = express.Router();

router.post("/generate", protect, generateInvite);
router.post("/send-email", protect, sendInviteByEmail);
router.post("/accept", protect, acceptInvite);
router.post("/reject", protect, rejectInvite);
router.get("/pending", protect, listPendingInvites);

export default router;
