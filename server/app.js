const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const schema = require("./schema/schema");
require("dotenv").config();

const app = express();
const serverUrl = `mongodb://${process.env.mongoUser}:${
  process.env.mongPassword
}@ds255857.mlab.com:55857/tucket`;

app.use(cors());

// db connect configuration
mongoose.connect(serverUrl, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected to the database");
});

// app graphql connection
app.get("/hello", function(req, res) {
  res.send({ tacos: "delicious" });
});

app.listen(4000, () => {
  console.log("the server is running on port 4000");
});
