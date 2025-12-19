import express from "express";
import { listIcons, uploadIcon } from "../controllers/iconController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// --------------------
// Multer Storage
// --------------------
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/icons");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

// --------------------
// File Filter (Discord-style)
// --------------------
const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp"];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// --------------------
// Routes
// --------------------

// Public icon list
router.get("/", listIcons);

// Protected upload
router.post(
  "/upload",
  protect,
  upload.single("icon"),
  uploadIcon
);

export default router;
