import { body } from 'express-validator';

/* ================= SIGNUP ================= */
export const signupValidation = [

  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be 3–20 characters')
    .matches(/^[a-zA-Z0-9_.]+$/)
    .withMessage('Username can contain letters, numbers, _ and . only'),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),

  body('email')
    .isEmail()
    .withMessage('Invalid email address'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
];

/* ================= LOGIN ================= */
export const loginValidation = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password required')
];

/* ================= OTP (Signup / Reset) ================= */
export const otpValidation = [
  body('email')
    .isEmail()
    .withMessage('Invalid email'),

  body('code')
    .trim()
    .isLength({ min: 4, max: 4 })
    .withMessage('OTP must be 4 digits')
    .isNumeric()
    .withMessage('OTP must be numeric')
];

/* ================= FORGOT PASSWORD ================= */
export const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .withMessage('Invalid email')
];

/* ================= RESET PASSWORD ================= */
export const resetPasswordValidation = [
  body('token')
    .notEmpty()
    .withMessage('Token required'),

  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
];
