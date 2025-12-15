// Backend/routes/chatRoutes.js
import express from "express";
import { createChatHandler, listChatsHandler, getChatHandler, addMemberHandler, removeMemberHandler } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createChatHandler); // create chat
router.get("/", protect, listChatsHandler);   // list chats for user
router.get("/:chatId", protect, getChatHandler);

router.post("/:chatId/members", protect, addMemberHandler);
router.delete("/:chatId/members/:userId", protect, removeMemberHandler);

export default router;
