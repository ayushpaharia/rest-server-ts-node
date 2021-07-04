import { Request, Response } from "express";
import { omit } from "lodash";
import log from "../logger";
import {
  checkIfUserExists,
  createUser,
  getUsers,
} from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    if (checkIfUserExists(req.body))
      return res.send({ message: "User with this email already exists!" });
    const user = await createUser(req.body);

    return res.send(omit(user.toJSON(), "password"));
  } catch (err) {
    log.error(err);
    res.status(409).send(err.message);
  }
}
export async function getUserHandler(req: Request, res: Response) {
  try {
    const users = await getUsers();

    return res.send(
      users.map((item) =>
        omit(item.toJSON(), [
          "password",
          "_id",
          "__v",
          "createdAt",
          "updatedAt",
        ])
      )
    );
  } catch (err) {
    log.error(err);
    res.status(409).send(err.message);
  }
}
