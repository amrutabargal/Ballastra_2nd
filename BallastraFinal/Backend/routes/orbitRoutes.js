
import express from "express";
import { followHandler, unfollowHandler, listOrbitsHandler, listObitorsHandler, listMutualHandler } from "../controllers/orbitController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/follow", protect, followHandler);
router.post("/unfollow", protect, unfollowHandler);

router.get("/orbits", protect, listOrbitsHandler);   // followers
router.get("/obitors", protect, listObitorsHandler); // following
router.get("/mutual", protect, listMutualHandler);   // mutual follows

export default router;
