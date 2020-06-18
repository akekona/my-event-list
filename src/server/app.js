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

async function validateUsername(username) {
  try {
    console.log("checking username");
    const userList = db
      .select("username")
      .table("users")
      .where("username", username);
    return userList.then((userList) => {
      console.log(userList);
      return userList;
    });
  } catch (err) {
    console.error("Error validating username", err);
  }
}

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

app.post("/api/events/:id/", async (req, res) => {
  try {
    const newEvent = req.body;
    const userID = req.params.id;
    const userEvents = await db("events").insert({
      user_id: userID,
      event_name: newEvent.eventName,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
    });
    res.send(userEvents);
  } catch (err) {
    res.sendStatus(400);
    console.error("Error adding new event", err);
  }
});

app.post("/api/users/", async (req, res) => {
  try {
    const newUser = req.body;
    console.log("server post", newUser);
    validateUsername(newUser.username).then((userList) => {
      if (!userList || userList.length === 0) {
        const user = db("users").insert({
          first_name: newUser.firstName,
          last_name: newUser.lastName,
          username: newUser.username,
          password: newUser.password,
        });
        return user.then((user) => {
          res.send(user);
        });
      } else {
        console.error("Username already exists");
        res.sendStatus(409);
      }
    });
  } catch (err) {
    res.sendStatus(400);
    console.error("Error adding new user", err);
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
