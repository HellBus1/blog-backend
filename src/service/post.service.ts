import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import { Post, PostDocument } from "../models/mongoose_model/post.model";

const createPost = (input: DocumentDefinition<PostDocument>) => {
  return Post.create(input);
}

const findPost = (query: FilterQuery<PostDocument>, options: QueryOptions = { lean: true }) => {
  return Post.findOne(query, {}, options);
}

const updatePost = (query: FilterQuery<PostDocument>, update: UpdateQuery<PostDocument>, options: QueryOptions) => {
  return Post.findOneAndUpdate(query, update, options);
}

const deletePost = (query: FilterQuery<PostDocument>) => {
  return Post.deleteOne(query);
}

export { createPost, findPost, updatePost, deletePost }