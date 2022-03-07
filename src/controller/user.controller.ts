import { Request, Response } from "express";
import { omit } from "lodash";
import { BaseResponse, CustomResponse } from "../models/baseResponse";
import { UserDocument } from "../models/mongoose_model/user.model";
import { createUser } from "../service/user.service";
import { HttpStatusCode, HttpStatusMessage } from "../utils/enumeration";

const createUserHandler = async (req: Request, res: CustomResponse<BaseResponse<UserDocument>>) => {
  try {
    const user = await createUser(req.body);

    return res.status(HttpStatusCode.OK).send({
      status_code: HttpStatusCode.OK,
      message: HttpStatusMessage.SUCCESS,
      data: omit(user.toJSON(), "password")
    });
  } catch (e) {
    return res.status(HttpStatusCode.INTERNAL_SERVER).send({
      status_code: HttpStatusCode.INTERNAL_SERVER,
      message: e.message,
      data: null
    });
  }
}

export { createUserHandler }