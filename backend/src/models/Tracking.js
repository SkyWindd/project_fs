import mongoose from "mongoose";

const TrackingSchema = new mongoose.Schema({
  tracking_id: Number,
  order_id: Number,
  drone_id: Number,
  latitude: Number,
  longitude: Number,
  altitude: Number,
  speed: Number,
  status: String,
  timestamp: String,
});

export default mongoose.model("Tracking", TrackingSchema);
