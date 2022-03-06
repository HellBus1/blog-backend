import { NextFunction } from "express";
import { get } from "lodash";
import { createAccessToken, reIssueAccessToken } from "../service/session.service";
import { decode } from "../utils/jwt-utils";

interface props {
  req: Request,
  res: Response,
  next: NextFunction,
}

const Auth = async (props) => {
  const accessToken = get(props.req, "headers.authorization", "").replace(/^Bearer\s/, "");
  const refreshToken = get(props.req, "headers.x-refresh");

  const { valid, expired } = decode(accessToken);

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);
    return props.next();
  }

  return props.next();
}

export default Auth;