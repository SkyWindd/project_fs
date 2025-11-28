import { Router } from "express";
import User from "../models/User.js";

const router = Router();

// Lấy thông tin user theo id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    if (!user) return res.status(404).json({ error: "User không tồn tại" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Thêm 1 địa chỉ mới
router.post("/:id/address", async (req, res) => {
  try {
    const { address } = req.body;
    const user = await User.findOne({ user_id: req.params.id });

    if (!user) return res.status(404).json({ error: "User không tồn tại" });

    user.addresses.push(address);
    await user.save();

    res.json({ message: "Đã thêm địa chỉ", addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
