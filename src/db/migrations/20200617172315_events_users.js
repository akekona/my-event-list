exports.up = function(knex) {
  return knex.schema
    .createTable("users", (t) => {
      t.increments("user_id");
      t.string("first_name").notNullable();
      t.string("last_name").notNullable();
      t.string("username")
        .notNullable()
        .unique();
      t.string("password").notNullable();
    })
    .then(() => {
      return knex.schema.createTable("events", (t) => {
        t.increments("event_id");
        t.integer("user_id").unsigned();
        t.foreign("user_id").references("users.user_id");
        t.string("event_name").notNullable();
        t.date("date").notNullable();
        t.time("time");
        t.text("location");
      });
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("events").dropTable("users");
};
