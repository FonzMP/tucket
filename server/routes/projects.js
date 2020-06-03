const express = require("express"),
  bodyParser = require("body-parser"),
  jwtMiddleware = require("../middleware/jwt_middleware"),
  cors = require("cors"),
  router = express.Router();

const Project = require("../models/project");
const Ticket = require("../models/ticket");
const User = require("../models/user");
const logger = require("../config/logger");

router.use(cors());

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Gets all projects
router.get("/", [jwtMiddleware.validateToken], function (req, res) {
  Project.find({}, function (err, allProjects) {
    if (err) {
      logger.log(
        "error",
        "error in locating all projects of error: " + err.message
      );
      res.status(200).send({ error: "No projects found" });
    } else {
      logger.log("info", "return all projects to user");
      res.send({ projects: allProjects });
    }
  });
});

// Gets Project with associated id and returns project and tickets
router.get("/:id", [jwtMiddleware.validateToken], (req, res) => {
  const id = req.params.id;
  console.log("req ", req.decoded);
  Project.findOne({ _id: id })
    .populate("tickets")
    .populate("owner")
    .exec((err, foundProject) => {
      if (err) {
        logger.log(
          "error",
          "error gathering tickets for project with id: " +
            id +
            " by error " +
            err.message
        );
        res.status(200).send({ error: "Cannot find project" });
      } else {
        User.findOne({ username: req.decoded.token }, (err, user) => {
          if (err) {
            logger.log("error", "error finding user while searching projects");
          }
          if (!!user) {
            let found = false;
            console.log("user ", user._id);
            console.log("project ", foundProject.owner._id);
            if (user._id.toString() == foundProject.owner._id.toString()) {
              found = true;
            }
            foundProject.members.map((member) => {
              if (member._id.toString() === user._id.toString()) {
                found = true;
              }
            });
            if (!found) {
              logger.log(
                "info",
                "user not validated in project " +
                  id +
                  " with username " +
                  req.decoded.token
              );
              res
                .status(200)
                .send({ error: "Sorry, you're not part of this project." });
            } else {
              logger.log("info", "found project with id of " + id);
              res.status(200).send({ project: foundProject });
            }
          }
        });
      }
    });
});

// Adds new project to the system
router.post("/new", [jwtMiddleware.validateToken], function (req, res) {
  const project = req.body.project;
  Project.create(project, (err, successProject) => {
    if (err) {
      logger.log("error", "error in project creation of error: " + err);
      res.status(200).send({ error: "Failed to create new project" });
    } else {
      logger.log(
        "info",
        "successfully created new project with id " + successProject._id
      );
      res.status(200).send({ project: successProject });
    }
  });
});

// Edits a project with id of :id
router.put("/:id", [jwtMiddleware.validateToken], function (req, res) {
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
      res.status(200).send({ error: "Cannot edit project with id " + id });
    } else {
      logger.log("info", "Updated project with id " + id);
      res.status(200).send({ project: projectUpdated });
    }
  });
});

// Deletes project with id of :id
router.delete("/:id", [jwtMiddleware.validateToken], function (req, res) {
  const id = req.params.id;
  Project.findByIdAndDelete(id, function (err, projectFound) {
    if (err) {
      logger.log(
        "error",
        "Error deleting project with " + id + " with error " + err
      );
      res.status(200).send({
        error: "Error deleting project with " + id + " with error " + err,
      });
    } else {
      logger.log("info", "deleted project with id " + id);
      res.status(200).send({ project: {} });
    }
  });
});

// Adds ticket to current project with id :projectId
router.post("/:projectId/tickets/new", [jwtMiddleware.validateToken], function (
  req,
  res
) {
  const projectId = req.params.projectId;
  Project.findById(projectId, function (err, projectFound) {
    if (err) {
      logger.log(
        "error",
        "error in adding ticket to the project with project id: " +
          id +
          " of error: " +
          err.message
      );
      res.status(200).send({
        error: "Error creating ticket for project with id " + projectId,
      });
    } else {
      Ticket.create(req.body.ticket, (err, newTicket) => {
        if (err) {
          res.status(200).send({
            error: "Cannot create new ticket for project with id" + projectId,
          });
        } else {
          projectFound.tickets.push(newTicket);
          logger.log(
            "info",
            "added new ticket to project " +
              projectId +
              " with id " +
              newTicket._id
          );
          if (projectFound.save()) {
            Project.findById(projectId)
              .populate("tickets")
              .exec((err, returnProject) => {
                if (err) {
                  logger.log(
                    "error",
                    "Error finding project after adding ticket " + newTicket._id
                  );
                  res
                    .status(200)
                    .send({ error: "Error finding project after ticket add" });
                } else {
                  logger.log(
                    "info",
                    "Created new ticket with id " +
                      newTicket._id +
                      " inside project with id " +
                      returnProject._id
                  );
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
router.get(
  "/:id/tickets/:ticketId",
  [jwtMiddleware.validateToken],
  (req, res) => {
    Ticket.findById(req.params.ticketId, (err, foundTicket) => {
      if (err) {
        logger.log(
          "error",
          "error locating ticket with id " + req.params.ticketId
        );
        res.status(200).send({
          error: "Error locating ticket with id " + req.params.ticketId,
        });
      } else {
        logger.log(
          "info",
          "found ticket inside a project with ticket id " + req.params.ticketId
        );
        res.status(200).send({ ticket: foundTicket });
      }
    });
  }
);

// Edits ticket of ticket id :ticketId
router.put(
  "/:projectId/tickets/:ticketId",
  [jwtMiddleware.validateToken],
  (req, res) => {
    Ticket.findByIdAndUpdate(
      req.params.ticketId,
      req.body.ticket,
      (err, updatedTicket) => {
        if (err) {
          logger.log(
            "error",
            "error updating ticket with id " + req.params.ticketId
          );
          res.status(200).send({
            error: "Error updating ticket with id " + req.params.ticketId,
          });
        } else {
          logger.log("info", "updated ticket with id ", req.params.ticketId);
          res.status(200).send({ ticket: updatedTicket });
        }
      }
    );
  }
);

// Deletes ticket with id :ticketId from project :id
router.delete(
  "/:id/tickets/:ticketId",
  [jwtMiddleware.validateToken],
  function (req, res) {
    const ticketId = req.params.ticketId;
    Ticket.deleteOne({ _id: ticketId }, (err, success) => {
      if (err) {
        logger.log("error", "trouble deleting ticket with id  + ticketId");
        res.status(500).send({ error: "Error deleting ticket" });
      } else {
        logger.log("info", "deleted ticket with ticket id " + ticketId);
        res.status(200).send({ project: success });
      }
    });
  }
);

// Adds User to Project with :projectId and :userId
router.post(
  "/:id/invite/:userId",
  [jwtMiddleware.validateToken],
  (req, res) => {
    const projectId = req.params.id;
    const userId = req.params.userId;
    Project.findById(projectId, (err, foundProject) => {
      if (err) {
        logger.log(
          "error",
          "error finding project with project id " + projectId
        );
        res.status(200).send({ error: "Cannot locate project for invite" });
      } else {
        if (!foundProject.invited.includes(userId)) {
          foundProject.invited.push(userId);
          if (foundProject.save()) {
            logger.log(
              "info",
              "found project and invited user with project id " +
                foundProject._id +
                " with user ID " +
                userId
            );
            res.status(200).send({ project: foundProject });
          } else {
            logger.log(
              "error",
              "error adding user to project " +
                projectId +
                " with user id " +
                userId
            );
            res.status(200).send({
              error: "Error adding user to the invite list of project",
            });
          }
        } else {
          logger.log(
            "info",
            "User with id " +
              userId +
              " inside project " +
              projectId +
              " is already in invites"
          );
          res
            .status(200)
            .send({ error: "User is already invited to that project" });
        }
      }
    });
  }
);

module.exports = router;
