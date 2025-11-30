import { Router } from "express";
import Store from "../models/Store.js";
import StoreMenuItem from "../models/StoreMenuItem.js";

const router = Router();

/* ============================================================
   📌 Lấy danh sách toàn bộ cửa hàng
============================================================ */
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find().sort({ store_id: 1 });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   📌 Tạo store mới
============================================================ */
router.post("/", async (req, res) => {
  try {
    if (!req.body.store_id) {
      return res.status(400).json({ error: "store_id is required" });
    }

    const exists = await Store.findOne({ store_id: req.body.store_id });
    if (exists) {
      return res.status(400).json({ error: "Store already exists" });
    }

    const store = await Store.create(req.body);
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   📌 Lấy Menu của một cửa hàng
============================================================ */
router.get("/:id/menu", async (req, res) => {
  try {
    const store_id = Number(req.params.id);

    const store = await Store.findOne({ store_id });
    if (!store) return res.status(404).json({ error: "Store not found" });

    const menu = await StoreMenuItem.find({ store_id }).sort({ item_id: 1 });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   📌 Gán menu cho cửa hàng
   req.body.items = [
     { item_id: 1, is_available: true, price_override: 99000 },
     { item_id: 2, is_available: false }
   ]
============================================================ */
router.post("/:id/menu", async (req, res) => {
  try {
    const store_id = Number(req.params.id);
    const items = req.body.items || [];

    // Kiểm tra store tồn tại
    const store = await Store.findOne({ store_id });
    if (!store) return res.status(404).json({ error: "Store not found" });

    // Xóa menu cũ để tránh trùng
    await StoreMenuItem.deleteMany({ store_id });

    // Tạo menu mới
    const inserted = await StoreMenuItem.insertMany(
      items.map((i) => ({
        store_id,
        item_id: i.item_id,
        is_available: i.is_available ?? true,
        price_override: i.price_override || null,
      }))
    );

    res.json({
      message: "Menu updated successfully",
      menu: inserted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
