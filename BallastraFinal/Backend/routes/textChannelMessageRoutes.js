import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  sendChannelMessage,
  getChannelMessages,
  editChannelMessage,
  deleteChannelMessage
} from "../controllers/textChannelMessageController.js";

const router = express.Router();

router.post("/:channelId/messages", protect, sendChannelMessage);
router.get("/:channelId/messages", protect, getChannelMessages);
router.patch("/messages/:messageId", protect, editChannelMessage);
router.delete("/messages/:messageId", protect, deleteChannelMessage);

export default router;
