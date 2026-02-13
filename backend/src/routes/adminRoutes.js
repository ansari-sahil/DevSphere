import express from "express";
import {
  getStats,
  getUsers,
  getUserById,
  toggleActive,
  changeRole,
  deleteUser,
} from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin only access
router.use(protect, authorize("admin"));

router.get("/stats", getStats);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id/toggle-active", toggleActive);
router.put("/users/:id/role", changeRole);
router.delete("/users/:id", deleteUser);

export default router;
