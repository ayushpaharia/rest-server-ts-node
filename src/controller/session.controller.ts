import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createAccessToken,
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import config from "config";
import { sign } from "../utils/jwt.utils";
import { get } from "lodash";

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
  // Send refresh and access token back to user
  return res.send({ accessToken, refreshToken });
}

export async function invalidateUserSessionHandler(
  req: Request,
  res: Response
) {
  const sessionId = get(req, "user.session");

  await updateSession({ _id: sessionId }, { valid: false });

  return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}
