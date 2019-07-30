const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// const schema = require("./schema/schema");
require("dotenv").config();

const Ticket = require('./models/ticket')

const app = express();
const serverUrl = `mongodb://${process.env.mongoUser}:${
  process.env.mongoPassword
  }@ds255857.mlab.com:55857/tucket`;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
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

app.post("/tickets/new", function (req, res) {
  const ticket = req.body.ticket
  Ticket.create(ticket, function (err, successTicket) {
    if (err) {
      console.log('error in ticket creation ', err)
    } else {
      res.send(successTicket)
    }
  })
});

app.get("/tickets", function (req, res) {
  Ticket.find({}, function (err, allTickets) {
    if (err) {
      console.log('error in ticket creation ', err)
    } else {
      res.send(allTickets)
    }
  })
});

app.listen(4000, () => {
  console.log("the server is running on port 4000");
});
