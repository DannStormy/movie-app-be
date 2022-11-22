import { config } from 'dotenv';
import pg from 'pg-promise';
import promise from 'bluebird';

config()

const pgp = pg({promiseLib: promise, noLocking: true});
const db = pgp(process.env.DB_URL);

export default db;