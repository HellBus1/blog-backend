import { Express, Request, Response } from "express";
import { createUserSessionHandler } from "../controller/session.controller";
import { createUserHandler } from "../controller/user.controller";
import validateRequest from "../middleware/validateRequest";
import { createUserSchema, createUserSessionSchema } from "../schema/user.schema";

const Routes = (app: Express) => {

  // Login
  app.post("/api/login", validateRequest(createUserSessionSchema), createUserSessionHandler);
  // Register user
  app.post("/api/register", validateRequest(createUserSchema), createUserHandler);
}

export default Routes;