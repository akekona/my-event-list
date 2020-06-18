const knex = require("knex");
const conn = require("./knexfile");

const db = knex({
  client: "pg",
  connection: conn.development.connection,
});

module.exports = db;
