import "dotenv/config";
import config from "./src/config/index";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "./src/logger";
import router from "./src/routes";

const app = express();

const port = config.PORT || 1000;

global.logger = logger;

// Welcome route
app.get("/", (_req, res) => {
  res.send({ message: "Welcome to Movie Library" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(router);

app.listen(port, () => {
  logger.info(`Application running on port ${port}`);
});

export default app;
