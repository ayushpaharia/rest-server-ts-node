import { Router, Response } from "express";

const healthCheckRoute: Router = Router();

/**
 * @route   GET /api/healthcheck
 * @desc    Healthcheck API
 */
healthCheckRoute.get("/healthcheck", (_, res: Response) =>
  res.status(200).json({ message: "API works fine" })
);

export default healthCheckRoute;
