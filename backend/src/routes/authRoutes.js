import express from "express";
import {
  register,
  login,
  refresh,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../middleware/authValidators.js";
import { loginLimiter } from "../middleware/loginLimiter.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, loginLimiter, validate, login);
router.post("/refresh", refresh);
router.post("/logout", protect, logout);
router.get("/verify-email/:token", verifyEmail);
router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validate,
  forgotPassword,
);
router.post("/reset-password", resetPasswordValidator, validate, resetPassword);

export default router;
