import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  store_id: { type: Number, unique: true, required: true },
  store_name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  latitude: Number,
  longitude: Number,
  phone_number: String,
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model("Store", StoreSchema);
