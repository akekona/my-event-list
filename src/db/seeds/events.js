exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("events")
    .del()
    .then(function() {
      return knex("events").insert([
        {
          user_id: 1,
          event_name: "Spring Concert",
          date: "2021-03-21",
          time: "10:00:00",
          location: "Shibuya, Tokyo",
        },
        {
          user_id: 2,
          event_name: "Fall Concert",
          date: "2020-08-20",
          time: "10:00:00",
          location: "Yamaha Concert Hall",
        },
      ]);
    });
};
