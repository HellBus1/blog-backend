import { omit } from "lodash";
import { UserDocument, UserModel } from "../models/mongoose_model/user.model";
import { DocumentDefinition, FilterQuery } from "mongoose";

const createUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    return await UserModel.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

const findUser = async (query: FilterQuery<UserDocument>) => {
  return UserModel.findOne(query).lean();
}

const validatePassword = async ({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}

export { createUser, findUser, validatePassword };