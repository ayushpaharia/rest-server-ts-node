import mongoose from "mongoose";
import config from "config";
import log from "../logger";

export default function connect() {
  const mongo_uri = config.get("mongo_uri") as string;
  return mongoose
    .connect(mongo_uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => log.info("Database connected!"))
    .catch((err) => {
      log.error("dberror", err);
      process.exit(1);
    });
}
