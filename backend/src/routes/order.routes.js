import { Router } from "express";
import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import Payment from "../models/Payment.js";
import Tracking from "../models/Tracking.js";
import MenuItem from "../models/MenuItem.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

/* =====================================================
   📌 1) Tạo đơn hàng — POST /api/orders  (USER ONLY)
===================================================== */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      user_id,
      store_id,
      note,
      payment_method,
      address,
      latitude,
      longitude,
      cart,
    } = req.body;

    // User chỉ được tạo đơn cho chính mình
    if (req.user.user_id !== user_id) {
      return res.status(403).json({ error: "Không có quyền tạo đơn hàng" });
    }

    if (!user_id || !address || !latitude || !longitude || !cart?.length) {
      return res.status(400).json({ error: "Thiếu dữ liệu đơn hàng" });
    }

    // ⭐ Tính tổng tiền
    const totalAmount = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const deliveryFee = 0;

    // ⭐ Generate order_id
    const lastOrder = await Order.findOne().sort({ order_id: -1 });
    const newOrderId = lastOrder ? lastOrder.order_id + 1 : 1;

    // ⭐ Tạo đơn hàng
    const order = await Order.create({
      order_id: newOrderId,
      user_id,
      store_id,
      address,
      latitude,
      longitude,
      drone_id: null,
      total_amount: totalAmount,
      delivery_fee: deliveryFee,
      discount: 0,
      status: "pending",
      note,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

   // ⭐ Tạo order detail
// ⭐ Lấy item từ DB để đảm bảo item_id & price đúng
let lastDetail = await OrderDetail.findOne().sort({ order_detail_id: -1 });
let nextDetailId = lastDetail ? lastDetail.order_detail_id + 1 : 1;

for (const c of cart) {
  const itemId = Number(c.item_id);

  if (!itemId) {
    return res.status(400).json({ error: "Thiếu item_id trong cart" });
  }

  const menuItem = await MenuItem.findOne({ item_id: itemId });
  if (!menuItem) {
    return res.status(400).json({ error: `Item không tồn tại (${itemId})` });
  }

  const price = menuItem.price;
  const quantity = c.quantity;
  const subtotal = price * quantity;

  console.log("➡ ORDER DETAIL WILL BE CREATED:", {
    item_id: itemId,
    price,
    quantity,
    subtotal
  });

  await OrderDetail.create({
    order_detail_id: nextDetailId++,
    order_id: newOrderId,
    item_id: itemId,       // ⭐ Đảm bảo item_id chắc chắn có
    quantity,
    price,
    subtotal,
    created_at: new Date().toISOString()
  });
}



    await OrderDetail.insertMany(detailPayload);

    // ⭐ Tạo payment
    await Payment.create({
      payment_id: newOrderId,
      order_id: newOrderId,
      payment_method,
      amount: totalAmount,
      status: "pending",
      created_at: new Date().toISOString(),
    });

    // ⭐ Tạo tracking
    await Tracking.create({
      tracking_id: newOrderId,
      order_id: newOrderId,
      latitude: null,
      longitude: null,
      speed: 0,
      updated_at: new Date().toISOString(),
    });

    res.json({
      message: "Tạo đơn hàng thành công",
      order_id: newOrderId,
    });
  } catch (err) {
    console.error("❌ Lỗi tạo đơn hàng:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =====================================================
   📌 2) Lấy danh sách đơn hàng của user — GET /api/orders/user/:id
===================================================== */
router.get("/user/:id", authMiddleware, async (req, res) => {
  try {
    const userId = Number(req.params.id);

    // User chỉ được xem đơn của chính mình
    if (req.user.user_id !== userId) {
      return res.status(403).json({ error: "Không có quyền xem đơn hàng" });
    }

    const orders = await Order.find({ user_id: userId }).sort({
      created_at: -1,
    });

    // Nếu user chưa từng mua
    if (!orders.length) {
      return res.json([]);
    }

    const orderIds = orders.map((o) => o.order_id);

    // 🔹 Lấy detail của tất cả đơn cùng lúc
    const details = await OrderDetail.find({
      order_id: { $in: orderIds },
    });

    // 🔹 Lấy payment của tất cả đơn
    const payments = await Payment.find({
      order_id: { $in: orderIds },
    });

    // 🔹 Lấy tracking của tất cả đơn
    const tracking = await Tracking.find({
      order_id: { $in: orderIds },
    });

    // 🔹 Lấy thông tin item theo item_id trong tất cả order_detail
    const itemIds = [...new Set(details.map((d) => d.item_id))];

    const items = await MenuItem.find({
      item_id: { $in: itemIds },
    });

    // 📦 Gom dữ liệu lại cho từng đơn hàng
    const result = orders.map((o) => {
      return {
        order: o,
        address: {
          address: o.address,
          latitude: o.latitude,
          longitude: o.longitude,
        },

        details: details.filter((d) => d.order_id === o.order_id),
        payment: payments.find((p) => p.order_id === o.order_id),
        tracking: tracking.find((t) => t.order_id === o.order_id),
        items,
      };
    });

    res.json(result);
  } catch (err) {
    console.log("❌ Lỗi lấy đơn hàng:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
