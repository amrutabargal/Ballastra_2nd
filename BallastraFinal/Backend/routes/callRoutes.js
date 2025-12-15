import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
    startCall,
    acceptCall,
    endCall,
    missedCall,
    getHistory,
    saveSDPController,
    addIce
} from "../controllers/callController.js";

const router = express.Router();

router.post("/start", protect, startCall);
router.post("/accept", protect, acceptCall);
router.post("/end", protect, endCall);
router.post("/missed", protect, missedCall);
router.get("/history", protect, getHistory);

// WebRTC signaling
router.post("/sdp", protect, saveSDPController);
router.post("/ice", protect, addIce);

export default router;
