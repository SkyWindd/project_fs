import User from "../models/User.js";
import bcrypt from "bcryptjs";

// 📌 GET ALL USERS
export async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: "Không thể tải danh sách người dùng" });
  }
}

// 📌 CREATE USER
export async function createUser(req, res) {
  try {
    const { full_name, email, phone_number, role, is_active, password } =
      req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ error: "Email đã tồn tại" });

    const hash = await bcrypt.hash(password || "123456", 10);

    const user = await User.create({
      full_name,
      email,
      phone_number,
      role,
      is_active,
      password: hash
    });

    res.json({ message: "Tạo người dùng thành công", user });
  } catch (err) {
    res.status(500).json({ error: "Không thể tạo người dùng" });
  }
}

// 📌 UPDATE USER
export async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const { full_name, email, phone_number, role, is_active } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { full_name, email, phone_number, role, is_active },
      { new: true }
    ).select("-password");

    res.json({ message: "Cập nhật thành công", user });
  } catch (err) {
    res.status(500).json({ error: "Không thể cập nhật người dùng" });
  }
}

// 📌 DELETE USER
export async function deleteUser(req, res) {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    res.json({ message: "Xóa người dùng thành công" });
  } catch (err) {
    res.status(500).json({ error: "Không thể xóa người dùng" });
  }
}
