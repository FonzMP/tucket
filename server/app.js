const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const schema = require("./schema/schema");
require("dotenv").config();

const app = express();
const serverUrl = `mongodb://${process.env.mongoUser}:${
  process.env.mongoPassword
}@ds255857.mlab.com:55857/tucket`;

app.use(cors());

// db connect configuration
mongoose.connect(serverUrl, { useNewUrlParser: true }).catch(err => {
  console.log("server error on connect ", err);
});
mongoose.connection
  .once("open", () => {
    console.log("connected to the database");
  })
  .catch(err => {
    console.log("error connecting ");
  });

// app graphql connection
app.get("/hello", function(req, res) {
  res.send({ tacos: "delicious" });
});

app.post("/ticket/new", function(req, res) {
  console.log("request ", req);
});

app.get("/tickets", function(req, res) {
  res.send({ id: "_13dad2ada2kfa", subject: "Tacos", content: "Here" });
});

app.listen(4000, () => {
  console.log("the server is running on port 4000");
});
