const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();

const Ticket = require("../models/ticket");
const Project = require("../models/project");

router.use(cors());

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

router.get("/:id", function(req, res) {
  const id = req.params.id;
  Ticket.findById(id, function(err, ticket) {
    if (err) {
      console.log("error in ticket get ", err);
    } else {
      res.send(ticket);
    }
  });
});

// router.post("/new", function (req, res) {
//   const ticket = req.body.ticket
//   const project = req.body.project
//   Ticket.create(ticket, function (err, successTicket) {
//     if (err) {
//       console.log('error in ticket creation ', err)
//     } else {
//       Project.findById(project._id, function (err, successProject) {
//         if (err) {
//           console.log('error finding associated project ', err)
//         } else {
//           successProject.tickets.push(successTicket)
//           successProject.save()
//           res.send(successProject)
//         }
//       })
//     }
//   })
// });

router.get("/", function(req, res) {
  Ticket.find({}, function(err, allTickets) {
    if (err) {
      console.log("error in ticket get ", err);
    } else {
      res.send({ projects: allTickets });
    }
  });
});

module.exports = router;
