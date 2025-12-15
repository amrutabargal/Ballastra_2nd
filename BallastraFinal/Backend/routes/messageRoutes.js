// Backend/routes/messageRoutes.js
import express from "express";
import { sendMessageHandler, getMessagesHandler, editMessageHandler, deleteMessageHandler, addReactionHandler } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:chatId", protect, sendMessageHandler); // REST send
router.get("/:chatId", protect, getMessagesHandler);  // fetch messages
router.put("/message/:messageId", protect, editMessageHandler);
router.delete("/message/:messageId", protect, deleteMessageHandler);

router.post("/message/:messageId/react", protect, addReactionHandler);

export default router;
