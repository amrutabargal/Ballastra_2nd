import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import crypto from "crypto";

import {
  createUser,
  findUserByEmail,
  findVerifiedUserByEmail,
  findVerifiedUserByUsername,
  findUserByUsername,
  markUserVerified,
  findUserByAppleId,
  createUserWithApple,
  findUserByGoogleId,
  createUserWithGoogle,
  attachGoogleId
} from '../models/userModel.js';

import { generateToken } from '../utils/generateToken.js';
import appleService from "../services/appleAuthService.js";
import googleService from "../services/googleAuthService.js";
import { sendEmail } from "../services/emailService.js";
import { createOtp, findValidOtp, markOtpUsed } from "../models/otpModel.js";

/* ================= SIGNUP (STEP 1) ================= */
export const signup = async (req, res) => {
  try {
    const { username, name, email, password, avatar_url } = req.body;

    // 1. Block if VERIFIED email exists
    const verifiedEmailUser = await findVerifiedUserByEmail(email);
    if (verifiedEmailUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // 2. Block if VERIFIED username exists
    const verifiedUsernameUser = await findVerifiedUserByUsername(username);
    if (verifiedUsernameUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // 3. Check if UNVERIFIED user already exists
    let user = await findUserByEmail(email);

    if (!user) {
      // create new unverified user
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await createUser({
        username,
        name,
        email,
        password: hashedPassword,
        avatar_url,
        is_verified: false
      });
    }

    // 4. Generate & send OTP (always)
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    await createOtp({
      user_id: user.id,
      code: otpCode,
      purpose: 'email_verification',
      ttlMinutes: 5
    });

    await sendEmail({
      to: email,
      subject: 'Your Ballastra verification code',
      text: `Your verification code is ${otpCode}`,
      html: `
        <p>Your Ballastra verification code is:</p>
        <h2>${otpCode}</h2>
        <p>This code expires in 5 minutes.</p>
      `
    });

    return res.status(200).json({
      message: 'OTP sent to email. Please verify to complete signup.',
      email
    });

  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


/* ================= VERIFY SIGNUP OTP (STEP 2) ================= */
export const verifySignupOtp = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code)
      return res.status(400).json({ message: 'Email and OTP required' });

    // find user (verified OR unverified)
    const user = await findUserByEmail(email);
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const otp = await findValidOtp({
      user_id: user.id,
      code,
      purpose: 'email_verification'
    });

    if (!otp)
      return res.status(400).json({ message: 'Invalid or expired OTP' });

    await markOtpUsed(otp.id);
    await markUserVerified(user.id);

    const token = generateToken(user);

    return res.json({
      message: 'Account verified successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'OTP verification failed' });
  }
};


/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND is_verified = true LIMIT 1',
      [email]
    );

    if (!rows.length)
      return res.status(401).json({ message: 'Invalid email or password' });

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken(user);

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Login failed' });
  }
};



/* ================= GOOGLE LOGIN (NEW) ================= */
export const googleLogin = async (req, res) => {
  try {
    const { id_token } = req.body;

    if (!id_token)
      return res.status(400).json({ message: "id_token is required" });

    // 1. Verify Google token
    const googleData = await googleService.verifyIdToken(id_token);
    const googleId = googleData.sub;
    const email = googleData.email;
    const name = googleData.name;
    const avatar_url = googleData.picture;

    // 2. Check if user exists
    let user = await findUserByGoogleId(googleId);

    if (!user) {
      // if same email exists, attach google id
      const emailUser = await findUserByEmail(email);
      if (emailUser) {
        user = await attachGoogleId(emailUser.id, googleId);
      } else {
        user = await createUserWithGoogle(name, email, googleId, avatar_url);
      }
    }

    // 3. Generate JWT
    const token = generateToken(user);

    return res.json({
      message: "Google login successful",
      token,
      user
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Google authentication failed" });
  }
};

/* ================= APPLE LOGIN ================= */
export const appleLogin = async (req, res) => {
  try {
    const { id_token } = req.body;
    if (!id_token)
      return res.status(400).json({ message: "id_token is required" });

    const appleData = await appleService.verifyIdToken(id_token);
    const appleId = appleData.sub;
    const email = appleData.email || null;

    let user = await findUserByAppleId(appleId);

    if (!user) {
      if (email) {
        const existingEmailUser = await findUserByEmail(email);
        if (existingEmailUser) {
          user = await attachAppleId(existingEmailUser.id, appleId);
        }
      }
      if (!user) {
        user = await createUserWithApple(email, appleId);
      }
    }

    const token = generateToken(user);
    res.json({ message: "Apple login success", token, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Apple login failed" });
  }
};

/* ================= PASSWORD RESET ================= */

async function getUserByEmail(email) {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE email=$1 LIMIT 1',
    [email]
  );
  return rows[0];
}


export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ success: false, message: 'email required' });

    const user = await getUserByEmail(email);
    if (!user)
      return res.status(404).json({ success: false, message: 'user not found' });

    const token = crypto.randomBytes(32).toString('hex');
    await createOtp({ user_id: user.id, code: token, purpose: 'password_reset', ttlMinutes: 5 });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetLink = `${frontendUrl}/reset-password?token=${token}`;

    await sendEmail({
      to: user.email,
      subject: "Password reset link",
      text: `Reset password: ${resetLink}`,
      html: `<a href="${resetLink}">Reset Password</a>`
    });

    res.json({ success: true, message: 'Password reset link sent' });
  } catch (err) { next(err); }
}

export async function verifyOtp(req, res, next) {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ success: false, message: 'email & code required' });

    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ success: false, message: 'user not found' });

    // try both common purposes for compatibility
    let otp = await findValidOtp({ user_id: user.id, code, purpose: 'password_reset' });
    if (!otp) otp = await findValidOtp({ user_id: user.id, code, purpose: 'forgot_password' });
    if (!otp) return res.status(400).json({ success: false, message: 'invalid or expired OTP' });

    await markOtpUsed(otp.id);

    res.json({ success: true, message: 'OTP verified' });
  } catch (err) { next(err); }
}

export async function resetPassword(req, res, next) {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
      return res.status(400).json({ success: false, message: 'token & password required' });

    const otp = await findValidOtp({ code: token, purpose: 'password_reset' });
    if (!otp)
      return res.status(400).json({ success: false, message: 'invalid or expired token' });

    await markOtpUsed(otp.id);

    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query(
      'UPDATE users SET password=$1 WHERE id=$2',
      [hash, otp.user_id]
    );

    res.json({ success: true, message: 'Password reset successful' });
  } catch (err) { next(err); }
}
