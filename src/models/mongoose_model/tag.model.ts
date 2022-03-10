import mongoose from "mongoose";
import { string } from "yup/lib/locale";

interface TagDocument extends mongoose.Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const TagSchema = new mongoose.Schema(
  {
    name: { type: String, default: true, unique: true }
  },
  { timestamps: true }
)

const Tag = mongoose.model<TagDocument>("Tag", TagSchema);

export { TagDocument, Tag };