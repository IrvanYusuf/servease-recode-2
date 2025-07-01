import { model, Schema } from "mongoose";
  
const postSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = model("Post", postSchema);  
