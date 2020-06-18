const config = require("./config");

module.exports = {
  development: {
    client: "pg",
    connection: config.DATABASE_URL || {
      user: config.DB_USERNAME,
      database: config.DB_NAME,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "../db/migrations",
    },
    seeds: {
      directory: "../db/seeds",
    },
  },

  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "../db/migrations",
    },
    seeds: {
      directory: "../db/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "../db/migrations",
    },
    seeds: {
      directory: "../db/seeds",
    },
  },
};
