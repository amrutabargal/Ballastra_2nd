// Backend/routes/discussionRoutes.js
import express from 'express';
import * as discCtrl from '../controllers/discussionController.js';
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/spaces/:spaceId', protect, discCtrl.createDiscussion);
router.get('/spaces/:spaceId', protect, discCtrl.getDiscussions);
router.post('/:postId/react', protect, discCtrl.react);

export default router;
