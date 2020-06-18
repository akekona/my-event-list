const app = require("./app");
const db = require("./knex");

require("dotenv").config();
const PORT = process.env.PORT;

(async () => {
  try {
    console.log("Running migrations");
    return db.migrate.latest({ directory: "src/db/migrations/" }).then(() => {
      app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
    });
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();
