import { object, string, array, number } from "yup";

const payload = {
  body: object({
    title: string().required("Title is required"),
    body: string()
      .required("Body is required")
      .min(120, "Body is too short - should be 120 chars minimum."),
    tags: array().required().min(1, "Post must have tags"),
  }),
};

const params = {
  params: object({
    id: string().required("id is required"),
  }),
};

export const createPostSchema = object({
  ...payload,
});

export const updatePostSchema = object({
  ...params,
  ...payload,
});

export const deletePostSchema = object({
  ...params,
});
