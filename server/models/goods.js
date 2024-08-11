import mongoose from "mongoose";

const GoodsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: { type: String },
});
export default mongoose.model("Goods", GoodsSchema);
