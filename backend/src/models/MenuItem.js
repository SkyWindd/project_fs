import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  item_id: Number,
  name: String,
  category_id: Number,
  description: String,
  price: Number,
  image_url: String,
  is_available: Boolean,
  created_at: String,
  updated_at: String,
});

export default mongoose.model("MenuItem", MenuItemSchema);
