exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "Sally",
          last_name: "Last",
          username: "t1",
          password: "t",
        },
        {
          first_name: "Tony",
          last_name: "Test",
          username: "t2",
          password: "t",
        },
      ]);
    });
};
