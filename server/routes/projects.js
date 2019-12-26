const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const winston = require("winston");

const Project = require("../models/project");
const Ticket = require("../models/ticket");

router.use(cors());

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize({ all: true })
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error"
    }),
    new winston.transports.File({ filename: "./logs/combined.log" })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

// Gets all projects
router.get("/", function(req, res) {
  Project.find({}, function(err, allProjects) {
    if (err) {
      logger.log(
        "error",
        "error in locating all projects of error: " + err.message
      );
    } else {
      res.send({ projects: allProjects });
    }
  });
});

// Gets Project with associated id and returns project and tickets
router.get("/:id", function(req, res) {
  const id = req.params.id;
  Project.findOne({ _id: id })
    .populate("tickets")
    .exec((err, foundProject) => {
      if (err) {
        logger.log(
          "error",
          "error gathering tickets for project with id: " +
            id +
            " by error " +
            err.message
        );
      } else {
        res.status(200).send({ project: foundProject });
      }
    });
});

// Adds new project to the system
router.post("/new", function(req, res) {
  const project = req.body.project;
  Project.create(project, function(err, successProject) {
    if (err) {
      logger.log("error", "error in project creation of error: " + err);
    } else {
      res.status(200).send({ project: successProject });
    }
  });
});

// Edits a project with id of :id
router.put("/:id", function(req, res) {
  const id = req.params.id;
  const newProject = req.body.project;
  Project.findByIdAndUpdate(id, newProject, (err, projectUpdated) => {
    if (err) {
      logger.log(
        "error",
        "error in project update for project id: " +
          id +
          " of error: " +
          err.message
      );
    } else {
      res.status(200).send({ project: projectUpdated });
    }
  });
});

// Deletes project with id of :id
router.delete("/:id", function(req, res) {
  const id = req.params.id;
  Project.findByIdAndDelete(id, function(err, projectFound) {
    if (err) {
      logger.log(
        "error",
        "Error deleting project with " + id + " with error " + err
      );
      res.status(500).send({
        error: "Error deleting project with " + id + " with error " + err
      });
    } else {
      res.status(200).send({ project: {} });
    }
  });
});

// Adds ticket to current project with id :projectId
router.post("/:projectId/tickets/new", function(req, res) {
  const projectId = req.params.projectId;
  Project.findById(projectId, function(err, projectFound) {
    if (err) {
      logger.log(
        "error",
        "error in adding ticket to the project with project id: " +
          id +
          " of error: " +
          err.message
      );
    } else {
      Ticket.create(req.body.ticket, (err, newTicket) => {
        if (err) {
          res.status(500).send({
            error: "Cannot create new ticket for project with id" + projectId
          });
        } else {
          projectFound.tickets.push(newTicket);
          if (projectFound.save()) {
            Project.findById(projectId)
              .populate("tickets")
              .exec((err, returnProject) => {
                if (err) {
                  res
                    .status(500)
                    .send({ error: "Error finding project after ticket add" });
                } else {
                  res.status(200).send({ project: returnProject });
                }
              });
          }
        }
      });
    }
  });
});

// Fetches ticket from project :id with ticket id of :ticketId
router.get("/:id/tickets/:ticketId", (req, res) => {
  Ticket.findById(req.params.ticketId, (err, foundTicket) => {
    if (err) {
      res.status(500).send({
        error: "Error locating ticket with id " + req.params.ticketId
      });
    } else {
      res.status(200).send({ ticket: foundTicket });
    }
  });
});

// Edits ticket of ticket id :ticketId
router.put("/:projectId/tickets/:ticketId", (req, res) => {
  Ticket.findByIdAndUpdate(
    req.params.ticketId,
    req.body.ticket,
    (err, updatedTicket) => {
      if (err) {
        console.log("error updating ticket");
        res.status(500).send({
          error: "Error updating ticket with id " + req.params.ticketId
        });
      } else {
        res.status(200).send({ ticket: updatedTicket });
      }
    }
  );
});

// Deletes ticket with id :ticketId from project :id
router.delete("/:id/tickets/:ticketId", function(req, res) {
  const ticketId = req.params.ticketId;
  Ticket.deleteOne({ _id: ticketId }, (err, success) => {
    if (err) {
      res.status(500).send({ error: "Error deleting ticket" });
    } else {
      res.status(200).send({ project: success });
    }
  });
});

module.exports = router;
