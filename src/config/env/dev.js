import "dotenv/config";

const {
  NODE_ENV,
  PORT,
  DEV_DB_URL,
  DEV_JWT_SECRET_KEY,
  DEV_REFRESH_SECRET,
  DEV_HOST,
  DEV_MAIL_USERNAME,
  DEV_MAIL_PASSWORD,
  DEV_OAUTH_CLIENTID,
  DEV_OAUTH_CLIENT_SECRET,
  DEV_OAUTH_REFRESH_TOKEN,
} = process.env;

export default {
  NODE_ENV,
  PORT,
  DB_URL: DEV_DB_URL,
  JWT_SECRET_KEY: DEV_JWT_SECRET_KEY,
  REFRESH_SECRET: DEV_REFRESH_SECRET,
  HOST: DEV_HOST,
  MAIL_USERNAME: DEV_MAIL_USERNAME,
  MAIL_PASSWORD: DEV_MAIL_PASSWORD,
  OAUTH_CLIENTID: DEV_OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET: DEV_OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN: DEV_OAUTH_REFRESH_TOKEN,
};
