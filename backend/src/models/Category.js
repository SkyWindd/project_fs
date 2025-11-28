import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  category_id: Number,
  category_name: String,
});

export default mongoose.model("Category", CategorySchema);
