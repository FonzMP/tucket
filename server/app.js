const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const projects = require("./routes/projects");
const auth = require("./routes/auth");
const users = require("./routes/users");

const app = express();
const serverUrl = `mongodb://${process.env.mongoUser}:${process.env.mongoPassword}@ds255857.mlab.com:55857/tucket`;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use("/projects", projects);
app.use("/auth", auth);
app.use("/users", users);
app.use(cors());

// db connect configuration
mongoose.connect(serverUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).catch(err => {
  console.log("server error on connect ", err);
});
mongoose.connection
  .once("open", () => {
    console.log("connected to the database");
  })
  .catch(err => {
    console.log("error connecting ", err);
  });

app.listen(4000, () => {
  console.log("the server is running on port 4000");
});
