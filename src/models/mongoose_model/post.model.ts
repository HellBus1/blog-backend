import mongoose from "mongoose"
import { UserDocument } from "./user.model";

interface PostDocument extends mongoose.Document {
  author: UserDocument["_id"];
  title: string;
  body: string;
  likes: number;
  tags: string[];
  thumbnail: string,
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String, default: true, required: true
    },
    body: { type: String, default: true },
    tags: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" },
      }
    ],
    likes: { type: Number, default: true },
    thumbnail: { type: String, default: true }
  },
  { timestamps: true }
)

const Post = mongoose.model<PostDocument>("Post", PostSchema)

export { PostDocument, Post };