require("dotenv").config();

const DB_USERNAME = process.env.VUE_APP_USERNAME;
const DB_NAME = process.env.VUE_APP_DATABASE_NAME;
const DATABASE_URL = process.env.DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.VUE_APP_PORT;

module.exports = {
  DB_USERNAME,
  DB_NAME,
  DATABASE_URL,
  NODE_ENV,
  PORT,
};
