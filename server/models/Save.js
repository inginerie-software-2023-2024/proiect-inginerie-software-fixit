import mongoose from "mongoose";

const saveSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const Save = mongoose.model("Save", saveSchema);

export default Save;