
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMyNotifications,
  readOne,
  readAll
} from "../controllers/notificationsController.js";

const router = express.Router();

router.get("/", protect, getMyNotifications);
router.patch("/:id/read", protect, readOne);
router.patch("/read-all", protect, readAll);

export default router;
