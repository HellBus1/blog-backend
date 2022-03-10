import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { HttpStatusCode, HttpStatusMessage } from "../utils/enumeration";

const requiresUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = get(req, "user");

  if (!user) {
    return res.status(HttpStatusCode.FORBIDDEN).send({
      status_code: HttpStatusCode.FORBIDDEN,
      message: HttpStatusMessage.FORBIDDEN,
      data: null
    });
  }

  return next();
};

export default requiresUser;