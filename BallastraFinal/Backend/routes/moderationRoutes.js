import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  kickUser,
  banUser,
  unbanUser,
  timeoutUser,
  removeTimeout
} from "../controllers/moderationController.js";

const router = express.Router();

router.post("/kick", protect, kickUser);
router.post("/ban", protect, banUser);
router.post("/unban", protect, unbanUser);
router.post("/timeout", protect, timeoutUser);
router.post("/untimeout", protect, removeTimeout);

export default router;
