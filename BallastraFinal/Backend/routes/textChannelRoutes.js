import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createTextChannel,
  listTextChannels,
  deleteTextChannel
} from "../controllers/textChannelController.js";

const router = express.Router();

router.post("/:spaceId/text", protect, createTextChannel);
router.get("/:spaceId/text", protect, listTextChannels);
router.delete("/text/:channelId", protect, deleteTextChannel);

export default router;
