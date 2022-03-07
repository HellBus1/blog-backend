import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { createAccessToken, reIssueAccessToken } from "../service/session.service";
import { decode } from "../utils/jwt-utils";

const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
  const refreshToken = get(req, "headers.x-refresh");

  const { valid, expired, decoded } = decode(accessToken);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;

    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      // Add the new access token to the response header
      res.setHeader("x-access-token", newAccessToken);

      const { decoded } = decode(newAccessToken);

      // @ts-ignore
      req.user = decoded;
    }

    return next();
  }

  return next();
}

export default Auth;