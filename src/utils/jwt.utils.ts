import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get("jwt_secret") as string;

export default function sign(
  object: Object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, privateKey, options);
}
