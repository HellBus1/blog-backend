import { Express, Request, Response } from "express";
import { createPostHandler } from "../controller/post.controller";
import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from "../controller/session.controller";
import { createUserHandler } from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import validateRequest from "../middleware/validateRequest";
import { createPostSchema } from "../schema/post.schema";
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


  /* Blog Post Management */
  // Create Post
  app.post("/api/blogs", [requireUser, validateRequest(createPostSchema)], createPostHandler)
  /* -------------------- */
}

export default Routes;