const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  jwtMiddleware = require('../middleware/jwt_middleware'),
  router = express.Router();

const User = require("../models/user");
const Project = require("../models/project");
const logger = require("../config/logger");

router.use(cors());

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

router.get("/", [jwtMiddleware.validateToken], (req, res) => {
  User.find({}, "username", (err, allUsers) => {
    if (err) {
      logger.log("error", "trouble locating all users " + err.message);
      res.status(200).send({ error: "Error locating all users" });
    } else {
      logger.log("info", "sending back all users");
      res.status(200).send({ users: allUsers });
    }
  });
});

router.get("/:username", [jwtMiddleware.validateToken], (req, res) => {
  User.find(
    {
      username: { $regex: new RegExp(req.params.username, "i") }
    },
    "username",
    (err, userFound) => {
      if (err) {
        logger.log("error", "trouble locating all users " + err.message);
        res.status(200).send({
          error: "Error locating user with username " + req.params.username
        });
      } else {
        logger.log(
          "info",
          "user located in DB of username " + userFound.username
        );
        res.status(200).send({ users: userFound });
      }
    }
  );
});

// Fetches user invites and projects
router.post("/:userId/invites", [jwtMiddleware.validateToken], (req, res) => {
  const userId = req.params.userId;
  Project.find(
    { $or: [{ invited: userId }, { members: userId }, { owner: userId }] },
    (err, projects) => {
      if (err) {
        logger.log(
          "error",
          "error locating project project invites, members, or owner for user with id " +
          userId
        );
        res
          .status(200)
          .send({
            error:
              "Error locating project and all invited, members, and owner details"
          });
      } else {
        logger.log(
          "info",
          "successfully located invites, members and owner for user with id " +
          userId
        );
        res.status(200).send({ projects: projects });
      }
    }
  );
});

// User Accept/Decline Invite
router.post("/:userId/invites/:projectId", [jwtMiddleware.validateToken], (req, res) => {
  const didAccept = req.body.accepted;
  const userId = req.params.userId;
  const projectId = req.params.projectId;
  Project.findById(projectId, (err, foundProject) => {
    if (err) {
      logger.log(
        "error",
        "error finding project with id " +
        projectId +
        " to remove user with id " +
        userId
      );
      res.status(200).send({ error: "Error finding a project with that id" });
    } else {
      let userIndex = foundProject.invited.indexOf(userId);
      foundProject.invited.splice(userIndex, 1);
      logger.log("info", "removed user from invited array");
      if (didAccept) {
        foundProject.members.push(userId);
        logger.log(
          "info",
          "user accepted invite and moved to members array with userId " +
          userId +
          " within project " +
          projectId
        );
      }
      foundProject.save();
      res.status(200).send({ project: foundProject });
    }
  });
});

module.exports = router;
