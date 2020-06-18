const knex = require("knex");
const conn = require("./knexfile");

const db = knex({
  client: "pg",
  connection: conn.process.env.NODE_ENV.connection,
});

module.exports = db;
