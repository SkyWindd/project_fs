import mongoose from "mongoose";

const StoreMenuItemSchema = new mongoose.Schema({
  store_id: { type: Number, required: true },
  item_id: { type: Number, required: true },
  is_available: { type: Boolean, default: true },
  price_override: { type: Number, default: null },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Tạo unique index để không bị trùng (1 món tương ứng 1 cửa hàng)
StoreMenuItemSchema.index({ store_id: 1, item_id: 1 }, { unique: true });

export default mongoose.model("StoreMenuItem", StoreMenuItemSchema);
