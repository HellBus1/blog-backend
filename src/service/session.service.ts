import { SessionModel, SessionDocument } from "../models/mongoose_model/session.model";
import { UserDocument } from "../models/mongoose_model/user.model";
import { LeanDocument } from "mongoose";
import { decode, sign } from "../utils/jwt-utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import { UpdateQuery, FilterQuery } from "mongoose";

interface accessTokenTypes {
  // Allows a user object that has had the password omitted or Allows a user object that has been found with .lean()
  user: any | Omit<UserDocument, "password"> | LeanDocument<Omit<UserDocument, "password">>,
  // Allows a session object that has had the password omitted or Allows a session object that has been found with .lean()
  session: Omit<SessionDocument, "password"> | LeanDocument<Omit<SessionDocument, "password">>;
}

const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent: userAgent })
  return session.toJSON();
}

const createAccessToken = ({ user, session }: accessTokenTypes) => {
  const { ACCESS_TOKEN_TTL } = process.env;

  const accessToken = sign({ ...user, }, { expiresIn: ACCESS_TOKEN_TTL })

  return accessToken;
}

const reIssueAccessToken = async (refreshToken: string) => {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) return false;

  // Get the session
  const session = await SessionModel.findById(get(decoded, "_id"));

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}

const updateSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  return SessionModel.updateOne(query, update);
}

const findSessions = async (query: FilterQuery<SessionDocument>) => {
  return SessionModel.find(query).lean();
}

export { createSession, createAccessToken, reIssueAccessToken, updateSession, findSessions };