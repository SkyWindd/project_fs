import { Router } from "express";
import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import Payment from "../models/Payment.js";
import Tracking from "../models/Tracking.js";
import Address from "../models/Address.js";
import MenuItem from "../models/MenuItem.js";

const router = Router();

/* =====================================================
   📌 1) Tạo đơn hàng — POST /api/orders
===================================================== */
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      store_id,
      note,
      payment_method,
      address,
      latitude,
      longitude,
      cart
    } = req.body;

    if (!user_id || !address || !latitude || !longitude || !cart?.length) {
      return res.status(400).json({ error: "Thiếu dữ liệu đơn hàng" });
    }

    const totalAmount = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const deliveryFee = 0;

    const lastOrder = await Order.findOne().sort({ order_id: -1 });
    const newOrderId = lastOrder ? lastOrder.order_id + 1 : 1;

    const order = await Order.create({
      order_id: newOrderId,
      user_id,
      store_id,

      // ⭐ địa chỉ giao hàng
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

    for (const c of cart) {
      const lastDetail = await OrderDetail.findOne().sort({ order_detail_id: -1 });
      const newDetailId = lastDetail ? lastDetail.order_detail_id + 1 : 1;

      await OrderDetail.create({
        order_detail_id: newDetailId,
        order_id: newOrderId,
        item_id: c.item_id,
        quantity: c.quantity,
        price: c.price,
        subtotal: c.price * c.quantity
      });
    }

    await Payment.create({
      payment_id: newOrderId,
      order_id: newOrderId,
      payment_method,
      status: "pending",
      created_at: new Date().toISOString()
    });

    await Tracking.create({
      tracking_id: newOrderId,
      order_id: newOrderId,
      latitude: null,
      longitude: null,
      speed: 0,
      updated_at: new Date().toISOString()
    });

    res.json({ message: "Tạo đơn hàng thành công", order_id: newOrderId });

  } catch (err) {
    console.error("❌ Lỗi tạo đơn hàng:", err);
    res.status(500).json({ error: err.message });
  }
});


/* =====================================================
   📌  Lấy đơn hàng theo user — GET /api/orders/user/:id
===================================================== */
router.get("/user/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const orders = await Order.find({ user_id: userId });

    const results = [];

    for (const o of orders) {
      const [details, payment, tracking] = await Promise.all([
        OrderDetail.find({ order_id: o.order_id }),
        Payment.findOne({ order_id: o.order_id }),
        Tracking.findOne({ order_id: o.order_id }),
      ]);

      // 🌟 Lấy item trong đơn
      const itemIds = details.map((d) => d.item_id);

      const items = await MenuItem.find({
        item_id: { $in: itemIds }
      });

      // ⭐ address lấy trực tiếp từ Order
      const address = {
        address: o.address,
        latitude: o.latitude,
        longitude: o.longitude,
      };

      results.push({
        order: o,
        address,
        details,
        payment,
        tracking,
        items
      });
    }

    return res.json(results);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
