import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createStory,
  listStories,
  myStories,
  deleteStory
} from "../controllers/storyController.js";

const router = express.Router();

router.post("/", protect, createStory);          // create story
router.get("/", protect, listStories);           // view all stories
router.get("/me", protect, myStories);           // my stories
router.delete("/:storyId", protect, deleteStory);// delete story

export default router;
