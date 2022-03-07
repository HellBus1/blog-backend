import { Express, Request, Response } from "express";
import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from "../controller/session.controller";
import { createUserHandler } from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import validateRequest from "../middleware/validateRequest";
import { createUserSchema, createUserSessionSchema } from "../schema/user.schema";

const Routes = (app: Express) => {

  // Login
  app.post("/api/login", validateRequest(createUserSessionSchema), createUserSessionHandler);
  // Register user
  app.post("/api/register", validateRequest(createUserSchema), createUserHandler);
  // Logout
  app.delete("/api/logout", requireUser, invalidateUserSessionHandler);
  // Get the user's sessions
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
}

export default Routes;