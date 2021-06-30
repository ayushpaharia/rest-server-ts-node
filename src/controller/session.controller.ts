import { Request, Response } from "express";
import log from "../logger";
import { validatePassword } from "../service/user.service";
import { createAccessToken, createSession } from "../service/session.service";
import config from "config";
import sign from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate email and password (service)
  const user = await validatePassword(req.body);

  if (!user) return res.status(401).send("Invalid username or password");

  // Create a session (service)
  const session = await createSession(user._id, req.get("user-agent") || "");

  // Create an access token (utility)
  const accessToken = await createAccessToken({
    user,
    session,
  });

  // Create refresh token (utility)
  const refreshToken = sign(session, {
    expiresIn: config.get("refreshTokenTtl"),
  });
  console.log({ accessToken, refreshToken });
  // Send refresh and access token back to user
  return res.send({ accessToken, refreshToken });
}
