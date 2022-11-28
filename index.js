import "dotenv/config";
import express from "express";
import logger from "./src/logger";
import router from "./src/routes";

const app = express();

const port = process.env.PORT || 1000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(3000, () => {
  logger.info(`Application running on port ${port}`);
});
