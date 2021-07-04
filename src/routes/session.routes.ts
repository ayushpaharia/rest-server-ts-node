import { Router, Response } from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  invalidateUserSessionHandler,
} from "../controller/session.controller";
import { requiresUser } from "../middleware";
import validateRequest from "../middleware/validateRequest";
import { createUserSessionSchema } from "../schema/user.schema";

const sessionRoutes: Router = Router();

/**
 * @route   POST /api/sessions
 * @desc    Login
 */
sessionRoutes.post(
  "/api/sessions",

  validateRequest(createUserSessionSchema),
  createUserSessionHandler
);

/**
 * @route   GET /api/sessions
 * @desc    Get the user's sessions
 */
sessionRoutes.get("/api/sessions", requiresUser, getUserSessionsHandler);

/**
 * @route   DELETE /api/sessions
 * @desc    Logout
 */
sessionRoutes.delete(
  "/api/sessions",
  requiresUser,
  invalidateUserSessionHandler
);

export default sessionRoutes;
