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

// Fetches user invites
router.post("/:userId", (req, res) => {
  const userId = req.params.userId;
  Project.find({ invited: userId }, (err, projects) => {
    if (err) {
      logger.log(
        "error",
        "error locating project invites for user with id " + userId
      );
    } else {
      logger.log(
        "info",
        "successfully located invites for user with id " + userId
      );
      res.status(200).send({ invites: projects });
    }
  });
});

module.exports = router;
