import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../utils/enumeration";

const validateRequest = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (e) {
    return res.status(HttpStatusCode.BAD_REQUEST).send({
      status_code: HttpStatusCode.BAD_REQUEST,
      message: e.message,
      data: null
    });
  }
};

export default validateRequest;