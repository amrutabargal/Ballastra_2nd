import express from "express";
import { listIcons, uploadIcon } from "../controllers/iconController.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Storage Config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/icons");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", listIcons);
router.post("/upload", auth, upload.single("icon"), uploadIcon);

export default router;
