module.exports = {
  development: {
    client: "pg",
    connection: process.env.VUE_APP_DATABASE_URL || {
      user: process.env.VUE_APP_USERNAME,
      database: process.env.VUE_APP_DATABASE_NAME,
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
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "pg",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
