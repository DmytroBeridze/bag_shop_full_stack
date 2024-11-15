import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  allGoodsPrice: {
    type: String,
  },
  order: {
    type: String,
  },
});

export default mongoose.model("Orders", OrderSchema);
