import mongoose from "mongoose";

const OrderDetailSchema = new mongoose.Schema({
  order_detail_id: Number,
  order_id: Number,
  item_id: Number,
  quantity: Number,
  price: Number,
  subtotal: Number,
});

export default mongoose.model("OrderDetail", OrderDetailSchema);
