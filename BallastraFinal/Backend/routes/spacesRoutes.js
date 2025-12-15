import express from 'express';
import { createSpace, listSpaces, getSpace, updateSpace, deleteSpace, createSpace as createSpaceFn } from "../controllers/spacesController.js";
import { listSpaceMembersHandler, updateSpaceSettingsHandler } from "../controllers/spacesController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
const router = express.Router();

// multer for icons
const storage = multer.diskStorage({
  destination(req, file, cb) { cb(null, "uploads/icons"); },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`);
  }
});


const upload = multer({ storage });
router.post("/create", protect, createSpace);
router.get("/nexus/:nexusId", protect, listSpaces);
router.get("/:spaceId", protect, getSpace);
router.put("/:spaceId", protect, updateSpace);
router.delete("/:spaceId", protect, deleteSpace);



router.get("/:spaceId/members", protect, listSpaceMembersHandler);
router.put("/:spaceId/settings", protect, updateSpaceSettingsHandler);
router.post("/:spaceId/icon", protect, upload.single("icon"), async (req,res,next)=>{
  // use controller upload function
  try { await import("../controllers/nexusController.js").then(m=>m.uploadNexusIconHandler(req,res,next)); } catch(e){next(e)}
});


export default router;
