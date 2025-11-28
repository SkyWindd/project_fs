import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_id: Number,
  full_name: String,
  email: String,
  phone_number: String,
  password: String,
  role: String,
  is_active: Boolean,
  created_at: String,
  updated_at: String,
});

export default mongoose.model("User", UserSchema);
