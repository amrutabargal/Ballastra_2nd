import express from 'express';
import {
    signup,
    login,
    appleLogin,
    forgotPassword,
    verifyOtp,
    resetPassword
} from '../controllers/authController.js';

const router = express.Router();

//POST
router.post('/signup', signup);
router.post('/login', login);
// Apple Sign-In
router.post("/apple/signin", appleLogin);
// alias to match frontend expectation: /apple-login
router.post('/apple-login', appleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
