import { Express, Request, Response } from "express";
import {
  createUserHandler,
  getUserHandler,
} from "./controller/user.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import { validate as validateRequest, requiresUser } from "./middleware";
import { invalidateUserSessionHandler } from "./controller/session.controller";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) =>
    res.status(200).json({ message: "API works fine" })
  );

  /**
   * @route   POST /api/users
   * @desc    Registers user
   */
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  /**
   * @route   GET /api/users
   * @desc    Gets a list of users
   */
  app.get("/api/users", getUserHandler);

  /**
   * @route   POST /api/sessions
   * @desc    Login
   */
  app.post(
    "/api/sessions",

    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  /**
   * @route   GET /api/sessions
   * @desc    Get the user's sessions
   */
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  /**
   * @route   DELETE /api/sessions
   * @desc    Logout
   */
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);
}
