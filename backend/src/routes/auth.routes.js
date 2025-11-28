import { Router } from "express";
import User from "../models/User.js";

const router = Router();

/**
 * 🔐 LOGIN
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email không tồn tại" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Sai mật khẩu" });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: "Tài khoản đã bị khóa" });
    }

    // Ẩn password khi trả về
    const { password: pw, ...safeUser } = user.toObject();

    return res.json({
      message: "Đăng nhập thành công",
      user: safeUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 🆕 REGISTER
 */
router.post("/register", async (req, res) => {
  const { full_name, email, password } = req.body;

  try {
    // Kiểm tra email tồn tại
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email đã tồn tại" });
    }

    const user = await User.create({
      user_id: Date.now(),     // bạn dùng user_id kiểu Number → giữ nguyên
      full_name,
      email,
      password,
      phone_number: "",
      role: "customer",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // Không trả password
    const { password: pw, ...safeUser } = user.toObject();

    return res.json({
      message: "Đăng ký thành công",
      user: safeUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
