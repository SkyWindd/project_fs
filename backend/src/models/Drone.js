import mongoose from "mongoose";

const DroneSchema = new mongoose.Schema({
  drone_id: Number,
  drone_code: String,
  model: String,
  max_payload: Number,
  max_range_km: Number,
  created_at: String,
});

export default mongoose.model("Drone", DroneSchema);
