const express = require("express");
const db = require("./knex");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

require("dotenv").config();
const port = process.env.VUE_APP_PORT;

//middleware
app.use(bodyParser.json());
app.use(cors());

//endpoints
app.get("/api/users/", async (req, res) => {
  try {
    const allUsers = await db.select().table("users");
    res.status(200).send(allUsers);
  } catch (err) {
    res.sendStatus(400);
    console.error("Error loading users", err);
  }
});

app.get("/api/events/", async (req, res) => {
  try {
    const allEvents = await db.select().table("events");
    res.status(200).send(allEvents);
  } catch (err) {
    res.sendStatus(400);
    console.error("Error loading events", err);
  }
});

app.get("/api/users/:username/", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await db
      .select()
      .table("users")
      .where("username", username);
    res.send(user);
  } catch (err) {
    res.sendStatus(400);
    console.error("Error loading user data");
  }
});

app.get("/api/events/:id/", async (req, res) => {
  try {
    const userId = req.params.id;
    const userEvents = await db
      .select()
      .table("events")
      .where("user_id", userId);
    res.send(userEvents);
  } catch (err) {
    res.sendStatus(400);
    console.error("Error loading user data");
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
