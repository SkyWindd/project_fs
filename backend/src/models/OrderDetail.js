import mongoose from "mongoose";

const OrderDetailSchema = new mongoose.Schema({
  order_detail_id: { type: Number, required: true },
  order_id: { type: Number, required: true },

  // ⭐ TRƯỜNG QUAN TRỌNG (PHẢI CÓ)
  item_id: { type: Number, required: true },

  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  subtotal: { type: Number, required: true },

  created_at: { type: String, default: new Date().toISOString() },
  updated_at: { type: String, default: new Date().toISOString() },
});

export default mongoose.model("OrderDetail", OrderDetailSchema);
