import mongoose from "mongoose";

const ContactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String },
    phone: { type: String, required: true },
    message: { type: String },
  },
  { timestamps: true }
);
export default mongoose.model("Contacts", ContactsSchema);
