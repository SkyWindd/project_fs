/* ============================
    ORDER SYSTEM TYPES
   ============================ */

/* ----- ORDER STATUS ----- */
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "delivering"
  | "completed"
  | "cancelled";

/* ----- PAYMENT STATUS ----- */
export type PaymentStatus =
  | "success"
  | "pending"
  | "failed"
  | "refunded";

/* ----- PAYMENT METHODS ----- */
export type PaymentMethod =
  | "banking"
  | "momo"
  | "vnpay";
/* ----- ORDER MODEL ----- */
export interface Order {
  order_id: number;
  user_id: number;
  address_id: number;
  drone_id: number;
  total_amount: number;
  delivery_fee: number;
  discount: number;
  status: OrderStatus;
  assigned_time: string;
  created_at: string;
  updated_at: string;
}

/* ----- ORDER DETAIL MODEL ----- */
export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  item_id: number;
  quantity: number;
  price: number;
  subtotal: number;
}

/* ----- PAYMENT MODEL ----- */
export interface Payment {
  payment_id: number;
  order_id: number;
  payment_method: PaymentMethod;
  amount: number;
  provider_transaction_id: string;
  status: PaymentStatus;
  transaction_time: string;
}

/* ----- TRACKING MODEL ----- */
export interface Tracking {
  tracking_id: number;
  order_id: number;
  drone_id: number;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  status: "enroute" | "delivered" | "returning" | "error";
  timestamp: string;
}

/* ============================
    ADDRESS TYPES (NEW)
   ============================ */

export interface Address {
  address_id: number;
  user_id: number;
  address_label: string;
  street: string;
  city: string;
  latitude: number;
  longitude: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

/* ============================
    STATUS TEXT & COLORS
   ============================ */

export const ORDER_STATUS_TEXT: Record<OrderStatus, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  delivering: "Đang giao",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export const ORDER_STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "bg-gray-200 text-gray-700",
  confirmed: "bg-blue-200 text-blue-700",
  delivering: "bg-yellow-200 text-yellow-700",
  completed: "bg-green-200 text-green-700",
  cancelled: "bg-red-200 text-red-700",
};

export const PAYMENT_STATUS_COLOR: Record<PaymentStatus, string> = {
  success: "bg-green-200 text-green-700",
  pending: "bg-yellow-200 text-yellow-700",
  failed: "bg-red-200 text-red-700",
  refunded: "bg-blue-200 text-blue-700",
};

export const PAYMENT_METHOD_TEXT: Record<PaymentMethod, string> = {
  banking: "Chuyển khoản ngân hàng",
  momo: "Ví MoMo",
  vnpay: "VNPAY",
};
