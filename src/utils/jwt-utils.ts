import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JwtResponse } from "../models/auth/jwt_response";

const { PRIVATE_KEY } = process.env;


const sign = (object: Object, options: jwt.SignOptions) => {
  return jwt.sign(object, PRIVATE_KEY, options)
}

const decode = (token: string): JwtResponse => {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);

    console.log(`decoded result ${decoded}`);

    return {
      valid: true,
      expired: false,
      decoded: decoded
    }
  } catch (err: JsonWebTokenError | Error) {
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null
    }
  }
}

export { sign, decode };