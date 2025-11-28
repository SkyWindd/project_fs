import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  order_id: Number,
  user_id: Number,
  address_id: Number,
  drone_id: Number,
  total_amount: Number,
  delivery_fee: Number,
  discount: Number,
  status: String,
  assigned_time: String,
  created_at: String,
  updated_at: String,
});

export default mongoose.model("Order", OrderSchema);
