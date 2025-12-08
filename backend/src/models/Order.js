// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  order_id: Number,
  user_id: Number,

  // ⭐ ĐỊA CHỈ GIAO HÀNG LƯU TRỰC TIẾP
  address: String,
  latitude: Number,
  longitude: Number,

  // ⭐ CỬA HÀNG PHỤ TRÁCH
  store_id: Number,

  drone_id: Number,

  total_amount: Number,
  delivery_fee: Number,
  discount: Number,

  status: {
    type: String,
    enum: ["pending", "confirmed", "delivering", "completed", "cancelled"],
    default: "pending",
  },       
  assigned_time: String,

  note: String,

  created_at: String,
  updated_at: String,
});

export default mongoose.model("Order", OrderSchema);
