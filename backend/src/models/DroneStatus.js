import mongoose from "mongoose";

const DroneStatusSchema = new mongoose.Schema({
  status_id: Number,
  drone_id: Number,
  current_latitude: Number,
  current_longitude: Number,
  battery_level: Number,
  availability: String,
  current_order_id: Number,
  updated_at: String,
});

export default mongoose.model("DroneStatus", DroneStatusSchema);
