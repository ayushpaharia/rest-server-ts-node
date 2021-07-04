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
import {
  createPostSchema,
  deletePostSchema,
  updatePostSchema,
} from "./schema/post.schema";
import {
  createPostHandler,
  deletePostHandler,
  getPostHandler,
  updatePostHandler,
} from "./controller/post.controller";

export default function (app: Express) {
  
  /**
   * @route   GET /api/healthcheck
   * @desc    Healthcheck API
   */
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

  /**
   * @route   POST /api/posts
   * @desc    Create a post
   */
  app.post(
    "/api/posts",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler
  );

  /**
   * @route   PUT /api/posts
   * @desc    Update a post
   */
  app.put(
    "/api/posts/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );

  /**
   * @route   GET /api/post
   * @desc    Update a post
   */
  app.put("/api/posts/:postId", getPostHandler);

  /**
   * @route   DELETE /api/posts
   * @desc    Delete a post
   */
  app.delete(
    "/api/posts/:postId",
    [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler
  );
}
