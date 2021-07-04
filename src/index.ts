console.clear();

import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import "./_deprecated.routes.ts";
import routes from "./_deprecated.routes";
import { deserializeUser } from "./middleware";
import {
  userRoutes,
  sessionRoutes,
  healthCheckRoute,
  postRoutes,
} from "./routes";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(userRoutes, sessionRoutes, healthCheckRoute, postRoutes);

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}/`);

  connect();
  routes(app);
});
