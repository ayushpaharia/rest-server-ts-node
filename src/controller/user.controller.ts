import { Request, Response } from "express";
import { omit } from "lodash";
import log from "../logger";
import { createUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);

    return res.send(omit(user.toJSON(), "password"));
  } catch (err) {
    log.error(err);
    res.status(409).send(err.message);
  }
}
