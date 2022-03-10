import { DocumentDefinition } from 'mongoose';
import { Post, PostDocument } from "../models/mongoose_model/post.model";

const createPost = (input: DocumentDefinition<PostDocument>) => {
  return Post.create(input);
}

export { createPost }