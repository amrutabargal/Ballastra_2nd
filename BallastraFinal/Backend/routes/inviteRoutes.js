// Backend/routes/inviteRoutes.js
const express = require('express');
const router = express.Router();
const inviteCtrl = require('../controllers/inviteController');
const auth = require('../middleware/auth');

router.post('/generate', auth, inviteCtrl.generateInvite); // POST /api/invite/generate
router.post('/accept', auth, inviteCtrl.acceptInvite);     // POST /api/invite/accept

module.exports = router;
