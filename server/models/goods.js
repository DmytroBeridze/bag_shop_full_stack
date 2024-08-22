import mongoose from "mongoose";

const GoodsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: { type: Array, default: "" },
    // picture: { type: String, default: "" },
    mainType: { type: String, required: true },
    type: { type: String, required: true },
    sale: { type: String },
    featured: { type: String },
    new: { type: String },
    promo: { type: String },
    // matherial: { type: String },

    parameters: {
      type: Object,
      color: { type: String },
      height: { type: String },
      width: { type: String },
      length: { type: String },
      weight: { type: String },
      price: { type: String, required: true },
    },

    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export default mongoose.model("Goods", GoodsSchema);
