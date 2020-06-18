const knex = require("knex");
const conn = require("./knexfile");
const config = require("../../vue.config");

const nodeEnv = config.NODE_ENV;
console.log(config);

const db = knex({
  client: "pg",
  connection: conn[nodeEnv].connection,
});

module.exports = db;
