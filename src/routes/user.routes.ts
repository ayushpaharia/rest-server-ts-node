import { Router, Response } from "express";
import {
  createUserHandler,
  getUserHandler,
} from "../controller/user.controller";
import validateRequest from "../middleware/validateRequest";
import { createUserSchema } from "../schema/user.schema";

const userRoutes: Router = Router();

/**
 * @route   POST /api/users
 * @desc    Registers user
 */
userRoutes.post(
  "/api/users",
  validateRequest(createUserSchema),
  createUserHandler
);

/**
 * @route   GET /api/users
 * @desc    Gets a list of users
 */
userRoutes.get("/api/users", getUserHandler);

export default userRoutes;
