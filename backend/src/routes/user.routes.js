import { Router } from "express";
import User from "../models/User.js";
import Address from "../models/Address.js";

const router = Router();

/* ================================
   📌 LẤY THÔNG TIN USER
================================ */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ user_id: Number(req.params.id) });
    if (!user) return res.status(404).json({ error: "User không tồn tại" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================================
   📌 CẬP NHẬT THÔNG TIN USER
================================ */
// Cập nhật thông tin user
router.put("/:id", async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { user_id: req.params.id },
      {
        full_name: req.body.full_name,
        phone_number: req.body.phone_number,
        password: req.body.password,
        updated_at: new Date().toISOString(),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "User không tồn tại" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ================================
   📌 LẤY DANH SÁCH ĐỊA CHỈ USER
================================ */
router.get("/:id/address", async (req, res) => {
  try {
    const list = await Address.find({ user_id: Number(req.params.id) });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================================
   📌 THÊM ĐỊA CHỈ MỚI
================================ */
router.post("/:id/address", async (req, res) => {
  try {
    const userId = Number(req.params.id);

    // 1️⃣ Lấy address cuối cùng của user để tạo id mới
    const last = await Address.find({ user_id: userId })
      .sort({ address_id: -1 })
      .limit(1);

    const nextId = last.length > 0 ? last[0].address_id + 1 : 1;

    // 2️⃣ Tạo payload đầy đủ
    const payload = {
      address_id: nextId,
      user_id: userId,
      address_label: req.body.address_label,
      street: req.body.street,
      city: req.body.city,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      is_default: req.body.is_default ?? false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // 3️⃣ Lưu
    const created = await Address.create(payload);
    res.json(created);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ================================
   📌 SỬA ĐỊA CHỈ
================================ */
router.put("/:id/address/:addressId", async (req, res) => {
  try {
    const user_id = Number(req.params.id);
    const address_id = Number(req.params.addressId);

    // Lấy thông tin cũ
    const existing = await Address.findOne({ user_id, address_id });
    if (!existing) {
      return res.status(404).json({ error: "Address không tồn tại" });
    }

    // Chuẩn hóa dữ liệu update
    const updatedData = {
      address_label: req.body.address_label ?? existing.address_label,
      street: req.body.street ?? existing.street,
      city: req.body.city ?? existing.city,
      latitude: req.body.latitude ?? existing.latitude,
      longitude: req.body.longitude ?? existing.longitude,
      is_default: req.body.is_default ?? existing.is_default,
      updated_at: new Date().toISOString(),

      // GIỮ NGUYÊN
      created_at: existing.created_at,
      user_id: existing.user_id,
      address_id: existing.address_id,
    };

    // Thực hiện cập nhật
    const updated = await Address.findOneAndUpdate(
      { user_id, address_id },
      updatedData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ================================
   📌 XOÁ ĐỊA CHỈ
================================ */
router.delete("/:id/address/:addressId", async (req, res) => {
  try {
    const deleted = await Address.findOneAndDelete({
      address_id: Number(req.params.addressId),
      user_id: Number(req.params.id),
    });

    if (!deleted)
      return res.status(404).json({ error: "Address không tồn tại" });

    res.json({ message: "Đã xoá địa chỉ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
