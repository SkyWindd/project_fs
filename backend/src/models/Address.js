import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  address_id: Number,
  user_id: Number,
  address_label: String,
  street: String,
  city: String,
  latitude: Number,
  longitude: Number,
  is_default: Boolean,
  created_at: String,
  updated_at: String,
});

export default mongoose.model("Address", AddressSchema);
