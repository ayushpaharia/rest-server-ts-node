import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import log from "../logger";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (err) {
      log.error(err);
      return res.status(400).send(err.errors);
    }
  };
export default validate;
