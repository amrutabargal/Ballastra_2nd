import express from 'express';
import { signup, login, appleLogin, forgotPassword, verifyOtp, resetPassword, verifySignupOtp } from '../controllers/authController.js';
import { signupValidation, loginValidation, otpValidation, forgotPasswordValidation, resetPasswordValidation } from '../validators/authValidator.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

router.post('/signup', signupValidation, validateRequest, signup);
router.post('/verify-signup-otp', otpValidation, validateRequest, verifySignupOtp);
router.post('/login', loginValidation, validateRequest, login);
router.post('/apple/signin', appleLogin);
router.post('/apple-login', appleLogin);
router.post('/forgot-password', forgotPasswordValidation, validateRequest, forgotPassword);
router.post('/verify-otp', otpValidation, validateRequest, verifyOtp);
router.post('/reset-password', resetPasswordValidation, validateRequest, resetPassword);

export default router;
