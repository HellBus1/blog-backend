import { validatePassword } from "../service/user.service";
import { Request, Response } from "express";
import { createSession, createAccessToken, updateSession, findSessions } from "../service/session.service";
import { sign } from "../utils/jwt-utils";
import { get } from "lodash";
import { HttpStatusCode, HttpStatusMessage } from "../utils/enumeration";
import { BaseResponse, CustomResponse } from "../models/baseResponse";
import { UserDocument } from "../models/mongoose_model/user.model";
import { SessionDocument } from "../models/mongoose_model/session.model";

const createUserSessionHandler = async (req: Request, res: CustomResponse<BaseResponse<UserDocument>>) => {
  try {
    // validate the email and password
    const user = await validatePassword(req.body);

    if (!user) {
      return res.status(HttpStatusCode.UNAUTHORIZED).send({
        status_code: HttpStatusCode.UNAUTHORIZED,
        message: HttpStatusMessage.INVALID_USERNAME_AND_PASSWORD,
        data: null
      });
    }

    try {
      // Create a session
      const session = await createSession(user._id, req.get("user-agent") || "");

      // create access token
      const accessToken = createAccessToken({
        user,
        session,
      });

      const { REFRESH_TOKEN_TTL } = process.env;

      // create refresh token
      const refreshToken = sign(session, {
        expiresIn: REFRESH_TOKEN_TTL, // 1 year
      });

      // send refresh & access token back
      return res.status(HttpStatusCode.OK).send({
        status_code: HttpStatusCode.OK,
        message: HttpStatusMessage.SUCCESS,
        data: { accessToken, refreshToken }
      });

    } catch (e) {
      return res.status(HttpStatusCode.INTERNAL_SERVER).send({
        status_code: HttpStatusCode.INTERNAL_SERVER,
        message: e.message,
        data: null
      });
    }
  } catch (e) {
    return res.status(HttpStatusCode.INTERNAL_SERVER).send({
      status_code: HttpStatusCode.INTERNAL_SERVER,
      message: e.message,
      data: null
    });
  }
}

const invalidateUserSessionHandler = async (req: Request, res: CustomResponse<any>) => {
  try {
    const sessionId = get(req, "user.session");

    const result = await updateSession({ _id: sessionId }, { valid: false });

    return res.status(HttpStatusCode.OK).send({
      status_code: HttpStatusCode.OK,
      message: HttpStatusMessage.SUCCESS,
      data: result
    });
  } catch (e) {
    return res.status(HttpStatusCode.INTERNAL_SERVER).send({
      status_code: HttpStatusCode.INTERNAL_SERVER,
      message: e.message,
      data: null
    });
  }
}

const getUserSessionsHandler = async (req: Request, res: CustomResponse<SessionDocument>) => {
  try {
    const userId = get(req, "user._id");

    const sessions = await findSessions({ user: userId, valid: true });

    return res.status(HttpStatusCode.OK).send({
      status_code: HttpStatusCode.OK,
      message: HttpStatusMessage.SUCCESS,
      data: sessions
    });

  } catch (e) {
    return res.status(HttpStatusCode.INTERNAL_SERVER).send({
      status_code: HttpStatusCode.INTERNAL_SERVER,
      message: e.message,
      data: null
    });
  }
}

export { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler }