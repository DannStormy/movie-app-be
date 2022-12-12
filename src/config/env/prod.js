import "dotenv/config";

const {
  NODE_ENV,
  PORT,
  PROD_DB_URL,
  PROD_JWT_SECRET_KEY,
  PROD_REFRESH_SECRET,
  PROD_HOST,
  PROD_MAIL_USERNAME,
  PROD_MAIL_PASSWORD,
  PROD_OAUTH_CLIENTID,
  PROD_OAUTH_CLIENT_SECRET,
  PROD_OAUTH_REFRESH_TOKEN,
} = process.env;

export default {
  NODE_ENV,
  PORT,
  DB_URL: PROD_DB_URL,
  JWT_SECRET_KEY: PROD_JWT_SECRET_KEY,
  REFRESH_SECRET: PROD_REFRESH_SECRET,
  HOST: PROD_HOST,
  MAIL_USERNAME: PROD_MAIL_USERNAME,
  MAIL_PASSWORD: PROD_MAIL_PASSWORD,
  OAUTH_CLIENTID: PROD_OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET: PROD_OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN: PROD_OAUTH_REFRESH_TOKEN,
};