const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();

const Ticket = require('../models/ticket')

router.use(cors())

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

router.get("/:id", function (req, res) {
  const id = req.params.id
  Ticket.findById(id, function (err, ticket) {
    if (err) {
      console.log('error in ticket get ', err)
    } else {
      res.send(ticket)
    }
  })
});

router.post("/new", function (req, res) {
  const ticket = req.body.ticket
  Ticket.create(ticket, function (err, successTicket) {
    if (err) {
      console.log('error in ticket creation ', err)
    } else {
      res.send(successTicket)
    }
  })
});

router.get("/", function (req, res) {
  Ticket.find({}, function (err, allTickets) {
    if (err) {
      console.log('error in ticket get ', err)
    } else {
      res.send(allTickets)
    }
  })
});


module.exports = router;