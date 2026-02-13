import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
  verifyEmail,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", protect, logout);
router.get("/verify-email/:token", verifyEmail);

export default router;
