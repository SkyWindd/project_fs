import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/adminUser.controller.js";

import { authenticateToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

// tất cả route admin đều cần login + admin role
router.use(authenticateToken, requireAdmin);

router.get("/", getAllUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
