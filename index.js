import "dotenv/config";
import express from "express";
import logger from "./src/logger/index";
import router from "./src/routes";

const app = express();

const port = process.env.PORT || 1000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  logger.info(req.body);
  let oldSend = res.send;
  res.send = function (data) {
    logger.info(JSON.parse(data));
    oldSend.apply(res, arguments);
  };
  next();
});
app.use(router);

app.listen(3000, () => {
  logger.info(`Application running on port ${port}`);
});
