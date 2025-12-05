import { Router } from "express";
import Store from "../models/Store.js";
import StoreMenuItem from "../models/StoreMenuItem.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

/* ============================================================
   📌 Lấy danh sách toàn bộ cửa hàng (PUBLIC - Web + Mobile)
============================================================ */
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find().sort({ store_id: 1 });

    res.json({
      count: stores.length,
      stores,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   📌 Tạo store mới (ADMIN ONLY)
============================================================ */
router.post("/", authMiddleware, async (req, res) => {
  try {
    // chỉ admin mới được tạo store
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Không có quyền tạo store" });
    }

    if (!req.body.store_id) {
      return res.status(400).json({ error: "store_id is required" });
    }

    const exists = await Store.findOne({ store_id: req.body.store_id });
    if (exists) {
      return res.status(400).json({ error: "Store already exists" });
    }

    const store = await Store.create(req.body);

    res.json({
      message: "Store created successfully",
      store,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   📌 Lấy Menu của một cửa hàng (PUBLIC - Web + Mobile)
============================================================ */
router.get("/:id/menu", async (req, res) => {
  try {
    const store_id = Number(req.params.id);

    const store = await Store.findOne({ store_id });
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    const menu = await StoreMenuItem.find({ store_id }).sort({ item_id: 1 });

    res.json({
      store,
      count: menu.length,
      menu,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   📌 Gán menu cho cửa hàng (ADMIN ONLY)
============================================================ */
router.post("/:id/menu", authMiddleware, async (req, res) => {
  try {
    // chỉ admin mới được cập nhật menu
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Không có quyền cập nhật menu" });
    }

    const store_id = Number(req.params.id);
    const items = req.body.items || [];

    const store = await Store.findOne({ store_id });
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    // Xóa menu cũ
    await StoreMenuItem.deleteMany({ store_id });

    // Tạo menu mới
    const inserted = await StoreMenuItem.insertMany(
      items.map((i) => ({
        store_id,
        item_id: i.item_id,
        is_available: i.is_available ?? true,
        price_override: i.price_override ?? null,
      }))
    );

    res.json({
      message: "Menu updated successfully",
      total_items: inserted.length,
      menu: inserted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
