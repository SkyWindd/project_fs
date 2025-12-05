import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret123";

/**
 * 🔐 LOGIN
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Email không tồn tại" });
    }

    // So sánh password đã mã hóa
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Sai mật khẩu" });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: "Tài khoản đã bị khóa" });
    }

    // Tạo token
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: pw, ...safeUser } = user.toObject();

    return res.json({
      message: "Đăng nhập thành công",
      token,
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
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email đã tồn tại" });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      user_id: Date.now(),
      full_name,
      email,
      password: hashedPassword,
      phone_number: "",
      role: "customer",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    const { password: pw, ...safeUser } = user.toObject();

    // Tạo token đăng nhập sẵn
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Đăng ký thành công",
      token,
      user: safeUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
