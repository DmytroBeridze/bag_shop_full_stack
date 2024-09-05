import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    picture: { type: Array, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Posts", PostsSchema);
