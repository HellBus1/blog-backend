import { get } from "lodash";
import { CustomRequest } from "../models/baseRequest";
import { BaseResponse, CustomResponse } from "../models/baseResponse";
import { PostDocument } from "../models/mongoose_model/post.model";
import { createPost } from "../service/post.service";
import { HttpStatusCode, HttpStatusMessage } from "../utils/enumeration";

const createPostHandler = async (req: CustomRequest<PostDocument>, res: CustomResponse<BaseResponse<PostDocument>>) => {
  const reqBody: PostDocument = req.body;
  const userId = get(req, "user._id");

  try {
    const postCreateResult = await createPost({ ...reqBody, author: userId });
    return res.status(HttpStatusCode.OK).send({
      status_code: HttpStatusCode.OK,
      message: HttpStatusMessage.SUCCESS,
      data: postCreateResult
    });
  } catch (e) {
    return res.status(HttpStatusCode.INTERNAL_SERVER).send({
      status_code: HttpStatusCode.INTERNAL_SERVER,
      message: e.message,
      data: null
    });
  }
}

export { createPostHandler }