import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../service/user.service";

const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    console.log(user)
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    console.log(e);
    return res.status(409).send(e.message);
  }
}

export { createUserHandler }