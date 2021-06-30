import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSessionHandler } from "./controller/session.controller";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import { validate as validateRequest } from "./middleware/validateRequest";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @route   POST /api/user
   * @desc    Register user
   */
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

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

  /**
   * @route   DELETE /api/sessions
   * @desc    Logout
   */
}
