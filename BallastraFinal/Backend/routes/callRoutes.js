import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
    startCall,
    acceptCall,
    endCall,
    missedCall,
    getHistory,
} from "../controllers/callController.js";

const router = express.Router();

router.post("/start", protect, startCall);
router.post("/accept", protect, acceptCall);
router.post("/end", protect, endCall);
router.post("/missed", protect, missedCall);
router.get("/history", protect, getHistory);


export default router;
