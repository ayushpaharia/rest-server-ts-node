import { Router, Response } from "express";
import {
  createPostHandler,
  deletePostHandler,
  getPostHandler,
  updatePostHandler,
} from "../controller/post.controller";
import { requiresUser } from "../middleware";

import validateRequest from "../middleware/validateRequest";
import {
  createPostSchema,
  deletePostSchema,
  updatePostSchema,
} from "../schema/post.schema";

const postRoutes: Router = Router();

/**
 * @route   POST /api/posts
 * @desc    Create a post
 */
postRoutes.post(
  "/api/posts",
  [requiresUser, validateRequest(createPostSchema)],
  createPostHandler
);

/**
 * @route   PUT /api/posts/:postId
 * @desc    Update a post
 */
postRoutes.get(
  "/api/posts/:postId",
  [requiresUser, validateRequest(updatePostSchema)],
  updatePostHandler
);

/**
 * @route   GET /api/posts/:postId
 * @desc    Fetch a post
 */
postRoutes.put("/api/posts/:postId", getPostHandler);

/**
 * @route   DELETE /api/posts
 * @desc    Delete a post
 */
postRoutes.delete(
  "/api/posts/:postId",
  [requiresUser, validateRequest(deletePostSchema)],
  deletePostHandler
);

export default postRoutes;
