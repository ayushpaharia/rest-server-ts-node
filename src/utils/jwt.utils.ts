import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get("jwt_secret") as string;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (err) {
    return {
      valid: false,
      expired: err.message === "jwt is expired",
      decoded: null,
    };
  }
}
