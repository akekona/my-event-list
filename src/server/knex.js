const knex = require("knex");
const conn = require("./knexfile");
require("dotenv").config();

const nodeEnv = process.env.NODE_ENV;

const db = knex({
  client: "pg",
  connection: conn[nodeEnv].connection,
});

module.exports = db;
