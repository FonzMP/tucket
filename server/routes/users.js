const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const winston = require("winston");

const User = require("../models/user");
const Project = require("../models/project");

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

router.get("/", (req, res) => {
  User.find({}, "username", (err, allUsers) => {
    if (err) {
      logger.log("error", "trouble locating all users " + err.message);
    } else {
      res.status(200).send({ users: allUsers });
    }
  });
});

router.get("/:username", (req, res) => {
  User.find(
    {
      username: { $regex: new RegExp(req.params.username, "i") }
    },
    "username",
    (err, userFound) => {
      if (err) {
        logger.log("error", "trouble locating all users " + err.message);
      } else {
        res.status(200).send({ users: userFound });
      }
    }
  );
});

// Fetches user invites and projects
router.post("/:userId/invites", (req, res) => {
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
router.post("/:userId/invites/:projectId", (req, res) => {
  console.log("hitting post for invite acceptance", req.params);
  const didAccept = req.body.accepted;
  const userId = req.params.userId;
  const projectId = req.params.projectId;
  Project.findById(projectId, (err, foundProject) => {
    console.log("inside message");
    if (err) {
      logger.log(
        "error",
        "error finding project with id " +
          projectId +
          " to remove user with id " +
          userId
      );
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
