import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createVoiceChannel,
  listVoiceChannels
} from "../controllers/voiceChannelController.js";

const router = express.Router();

router.post("/:spaceId/voice", protect, createVoiceChannel);
router.get("/:spaceId/voice", protect, listVoiceChannels);

export default router;
