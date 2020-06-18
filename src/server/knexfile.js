require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URL || {
      user: process.env.USERNAME,
      database: process.env.DATABASE_NAME,
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
