import express from "express";
import { createNexus, uploadNexusIconHandler,  searchNexusHandler, updateAppearanceHandler, getMyNexus, getPublicNexus, getNexusById, updateNexus, deleteNexus } from "../controllers/nexusController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();


router.post('/', protect, createNexus);       // POST /api/nexus
router.get('/my', protect, getMyNexus);       // GET /api/nexus/my
router.get('/public', getPublicNexus);     // GET /api/nexus/public
router.get('/:id', protect, getNexusById);    // GET /api/nexus/:id
router.put('/:id', protect, updateNexus);     // PUT /api/nexus/:id
router.delete('/:id', protect, deleteNexus);  // DELETE /api/nexus/:id

router.get("/search", protect, searchNexusHandler);
router.put("/:nexusId/appearance", protect, updateAppearanceHandler);
// router.get("/:nexusId/members", protect, listNexusMembersHandler);

// icon upload
const storage = multer.diskStorage({
  destination(req, file, cb) { cb(null, "uploads/icons"); },
  filename(req,file,cb){ const ext=path.extname(file.originalname); cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`); }
});
const upload = multer({ storage });
router.post("/:nexusId/icon", protect, upload.single("icon"), uploadNexusIconHandler);


export default router;
