const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

require("dotenv").config();
const port = process.env.VUE_APP_PORT;

//middleware
app.use(bodyParser.json());
app.use(cors());

//endpoints

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
