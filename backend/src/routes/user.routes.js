import { Router } from "express";
import User from "../models/User.js";
import Address from "../models/Address.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

/* ================================
   📌 LẤY THÔNG TIN USER (YÊU CẦU LOGIN)
================================ */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user_id = Number(req.params.id);

    // Không cho user xem info của người khác
    if (req.user.user_id !== user_id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Không có quyền truy cập" });
    }

    const user = await User.findOne({ user_id }, { password: 0 }); // ẩn password
    if (!user) return res.status(404).json({ error: "User không tồn tại" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================================
   📌 CẬP NHẬT THÔNG TIN USER (SAFETY MODE)
================================ */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const user_id = Number(req.params.id);

    if (req.user.user_id !== user_id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Không có quyền cập nhật" });
    }

    const allowed = {
      full_name: req.body.full_name,
      phone_number: req.body.phone_number,
      updated_at: new Date().toISOString(),
    };

    // Tuyệt đối KHÔNG cho sửa password ở API này
    // Sửa password phải qua API riêng có kiểm tra mật khẩu cũ

    const updated = await User.findOneAndUpdate(
      { user_id },
      allowed,
      { new: true, projection: { password: 0 } }
    );

    if (!updated) return res.status(404).json({ error: "User không tồn tại" });

    res.json({ message: "Cập nhật thành công", user: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================================
   📌 LẤY DANH SÁCH ĐỊA CHỈ USER
================================ */
router.get("/:id/address", authMiddleware, async (req, res) => {
  try {
    const user_id = Number(req.params.id);

    if (req.user.user_id !== user_id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Không có quyền truy cập" });
    }

    const list = await Address.find({ user_id });
    res.json({ addresses: list });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================================
   📌 THÊM ĐỊA CHỈ MỚI
================================ */
router.post("/:id/address", authMiddleware, async (req, res) => {
  try {
    const user_id = Number(req.params.id);

    if (req.user.user_id !== user_id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Không có quyền thêm địa chỉ" });
    }

    const last = await Address.find({ user_id })
      .sort({ address_id: -1 })
      .limit(1);

    const nextId = last.length > 0 ? last[0].address_id + 1 : 1;

    const payload = {
      address_id: nextId,
      user_id,
      address_label: req.body.address_label,
      street: req.body.street,
      city: req.body.city,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      is_default: req.body.is_default ?? false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const created = await Address.create(payload);
    res.json({ message: "Đã thêm địa chỉ", address: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================================
   📌 SỬA ĐỊA CHỈ
================================ */
router.put("/:id/address/:addressId", authMiddleware, async (req, res) => {
  try {
    const user_id = Number(req.params.id);
    const address_id = Number(req.params.addressId);

    if (req.user.user_id !== user_id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Không có quyền sửa địa chỉ" });
    }

    const existing = await Address.findOne({ user_id, address_id });
    if (!existing) {
      return res.status(404).json({ error: "Address không tồn tại" });
    }

    const updatedData = {
      address_label: req.body.address_label ?? existing.address_label,
      street: req.body.street ?? existing.street,
      city: req.body.city ?? existing.city,
      latitude: req.body.latitude ?? existing.latitude,
      longitude: req.body.longitude ?? existing.longitude,
      is_default: req.body.is_default ?? existing.is_default,
      updated_at: new Date().toISOString(),
    };

    const updated = await Address.findOneAndUpdate(
      { user_id, address_id },
      updatedData,
      { new: true }
    );

    res.json({ message: "Đã cập nhật địa chỉ", address: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================================
   📌 XOÁ ĐỊA CHỈ
================================ */
router.delete("/:id/address/:addressId", authMiddleware, async (req, res) => {
  try {
    const user_id = Number(req.params.id);
    const address_id = Number(req.params.addressId);

    if (req.user.user_id !== user_id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Không có quyền xoá địa chỉ" });
    }

    const deleted = await Address.findOneAndDelete({ user_id, address_id });

    if (!deleted)
      return res.status(404).json({ error: "Address không tồn tại" });

    res.json({ message: "Đã xoá địa chỉ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
