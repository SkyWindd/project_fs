import { Router } from "express";
import {
  adminGetOrders,
  adminGetOrderById,
  adminUpdateOrderStatus,
  adminDeleteOrder
} from "../controllers/adminOrder.controller.js";

const router = Router();

// Lấy danh sách đơn hàng
router.get("/orders", adminGetOrders);

// Lấy đơn theo order_id
router.get("/orders/:id", adminGetOrderById);

// Cập nhật trạng thái đơn
router.put("/orders/:id", adminUpdateOrderStatus);

// Xóa đơn
router.delete("/orders/:id", adminDeleteOrder);

export default router;
