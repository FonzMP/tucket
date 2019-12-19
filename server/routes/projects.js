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

// Edits a project with id of :id
router.put("/:id", function(req, res) {
  const id = req.params.id;
  const newProject = req.body.project;
  Project.findByIdAndUpdate(id, newProject, function(err, projectUpdated) {
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

router.put("/:id/tickets", function(req, res) {
  const id = req.params.id;
  const ticket = req.body.ticket;
  Project.findById(id, function(err, projectFound) {
    if (err) {
      logger.log(
        "error",
        "error in finding project during ticket update with project id: " +
          id +
          " of error: ",
        err
      );
    } else {
      projectFound.push(ticket);
      if (projectFound.save()) {
        res.status(200).send({ project: projectFound });
      } else {
        res.status(500).send({
          error: "error adding ticket to project with id: " + projectFound._id
        });
      }
    }
  });
});

router.delete("/:id/tickets/:ticketId", function(req, res) {
  const projectId = req.params.id;
  const ticketId = req.params.ticketId;
  Project.findById(projectId, function(err, projectFound) {
    if (err) {
      logger.log(
        "error",
        "Error finding project while locating project with id: " +
          projectId +
          " for ticket deletion with ticket id: " +
          ticketId +
          " of error: " +
          err
      );
    } else {
      const tickets = projectFound.tickets.filter(ticket => {
        return ticket._id != ticketId;
      });
      projectFound.tickets = tickets;
      projectFound.save();
      res.send(projectFound);
    }
  });
});

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

module.exports = router;
