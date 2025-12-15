import bcrypt from 'bcryptjs';
import pool from '../config/db.js'; 
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import { createUser, findUserByEmail, findUserByAppleId, createUserWithApple} from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';
import appleService from "../services/appleAuthService.js";
import { sendEmail } from "../services/emailService.js";
import { createOtp, findValidOtp, markOtpUsed } from "../models/otpModel.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, avatar_url } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(name, email, hashedPassword, avatar_url);

        const token = generateToken(user);
        res.status(201).json({ message: 'Signup successful', user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // 1. Find user by email
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = userResult.rows[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. Return success response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const appleLogin = async (req, res) => {
    try {
        const { id_token } = req.body;

        if (!id_token) {
            return res.status(400).json({ message: "id_token is required" });
        }

        // 1. Verify Apple Token
        const appleData = await appleService.verifyIdToken(id_token);

        const appleId = appleData.sub;
        const email = appleData.email || null;

        // 2. Check if user exists by apple_id
        let user = await findUserByAppleId(appleId);

        if (!user) {
            // If not found by appleId but email exists, attach appleId
            if (email) {
                const existingEmailUser = await findUserByEmail(email);

                if (existingEmailUser) {
                    user = await attachAppleId(existingEmailUser.id, appleId);
                }
            }

            // If still no user → create new
            if (!user) {
                user = await createUserWithApple(email, appleId);
            }
        }

        // 3. Generate JWT
        const token = generateToken(user.id);

        return res.json({
            message: "Apple login success",
            token,
            user
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Apple login failed" });
    }
};

// helper to get user by email
async function getUserByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email=$1 LIMIT 1', [email]);
  return rows[0];
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success:false, message:'email required' });
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ success:false, message:'user not found' });
    // generate a secure token and store it as a password-reset purpose
    const token = crypto.randomBytes(32).toString('hex');
    // token valid for 60 minutes
    await createOtp({ user_id: user.id, code: token, purpose: 'password_reset', ttlMinutes: 60 });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetLink = `${frontendUrl.replace(/\/$/, '')}/reset-password?token=${token}`;

    // send email containing the reset link
    await sendEmail({
      to: user.email,
      subject: "Password reset link",
      text: `Click the link to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 60 minutes.</p><p>If the link does not work, copy and paste this token into the app: <code>${token}</code></p>`
    });

    res.json({ success:true, message:'Password reset link sent to email' });
  } catch (err) { next(err); }
}

export async function verifyOtp(req, res, next) {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ success:false, message:'email & code required' });
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ success:false, message:'user not found' });

    const otp = await findValidOtp({ user_id: user.id, code, purpose: 'forgot_password' });
    if (!otp) return res.status(400).json({ success:false, message:'invalid or expired OTP' });

    // mark used
    await markOtpUsed(otp.id);

    // respond with temporary token (you can issue short-lived JWT or just return success to proceed to reset)
    res.json({ success:true, message:'OTP verified' });
  } catch (err) { next(err); }
}

export async function resetPassword(req, res, next) {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ success:false, message:'token and newPassword required' });

    // find the password_reset token (we allow lookup by code alone)
    const otp = await findValidOtp({ code: token, purpose: 'password_reset' });
    if (!otp) return res.status(400).json({ success:false, message:'invalid or expired token' });

    // mark token used
    await markOtpUsed(otp.id);

    // update password for the associated user
    const saltRounds = 10;
    const hash = await bcrypt.hash(newPassword, saltRounds);
    await pool.query('UPDATE users SET password=$1 WHERE id=$2', [hash, otp.user_id]);

    res.json({ success:true, message:'Password reset successful' });
  } catch (err) { next(err); }
}

