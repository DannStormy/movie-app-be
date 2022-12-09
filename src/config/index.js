import { dev, test, prod } from "./env/index";

const { NODE_ENV } = process.env;

const config =
  NODE_ENV === "development" ? dev : NODE_ENV === "production" ? prod : test;

export default config;
