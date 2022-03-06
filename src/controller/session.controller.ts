import { validatePassword } from "../service/user.service";
import { Request, Response } from "express";
import { createSession, createAccessToken, updateSession, findSessions } from "../service/session.service";
import { sign } from "../utils/jwt-utils";
import { get } from "lodash";

const createUserSessionHandler = async (req: Request, res: Response) => {
  // validate the email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

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
  return res.send({ accessToken, refreshToken });
}

const invalidateUserSessionHandler = async (
  req: Request,
  res: Response
) => {
  const sessionId = get(req, "user.session");

  await updateSession({ _id: sessionId }, { valid: false });

  return res.sendStatus(200);
}

const getUserSessionsHandler = async (req: Request, res: Response) => {
  const userId = get(req, "user._id");

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler }