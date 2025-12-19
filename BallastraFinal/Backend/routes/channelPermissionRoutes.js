import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updateChannelPermissions } from "../controllers/channelPermissionController.js";

const router = express.Router();

router.patch("/:channelId/permissions", protect, updateChannelPermissions);

export default router;
