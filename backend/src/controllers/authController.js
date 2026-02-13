import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { sendEmail } from "../utils/email.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = await User.create({ name, email, password });
    const rawToken = crypto.randomBytes(32).toString("hex");

    user.emailVerificationToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    await user.save();

    const verifyURL = `http://localhost:5000/api/auth/verify-email/${rawToken}`;

    await sendEmail({
      to: user.email,
      subject: "Verify your email",
      html: `
        <h3>Welcome to DevSphere</h3>
        <p>Please verify your email:</p>
        <a href="${verifyURL}">${verifyURL}</a>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
    });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const user = await User.findById(decoded.id).select("+refreshToken");

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = generateAccessToken(user._id);

    res.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    user.refreshToken = null;
    await user.save();

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Password Reset",
      html: `
        Your password reset token:
        ${rawToken}
        
      `,
    });

    res.json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const hashed = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashed,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    next(err);
  }
};
