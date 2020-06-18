const app = require("./app");
const db = require("./knex");
const config = require("../../vue.config");

require("dotenv").config();
const PORT = config.PORT;

(async () => {
  try {
    console.log("Running migrations");
    await db.migrate.latest({ directory: "src/db/migrations/" });
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();
