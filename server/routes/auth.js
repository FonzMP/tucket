const express = require("express"),
  bcrypt = require("bcrypt"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  router = express.Router(),
  saltRounds = parseInt(process.env.saltRounds);

const User = require("../models/user");
const logger = require("../config/logger");

router.use(cors());

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.user.username }, (err, userFound) => {
    if (err) {
      logger.log(
        "error",
        "error locating user with username " + req.body.user.username
      );
    } else {
      if (!!userFound) {
        if (bcrypt.compareSync(req.body.user.password, userFound.password)) {
          userFound.password = undefined;
          logger.log(
            "info",
            "returning found user after login " + userFound.username
          );
          res.status(200).send({ user: userFound });
        } else {
          logger.log("error", "invalid username and password combo");
          res.status(200).send({ error: "Invalid username and password" });
        }
      } else {
        logger.log(
          "error",
          "error locating user with username " + req.body.user.username
        );
        res
          .status(200)
          .send({ error: "Error locating a user with that username" });
      }
    }
  });
});

router.post("/signup", (req, res) => {
  var hash = bcrypt.hashSync(req.body.user.password, saltRounds);
  req.body.user.password = hash;
  User.create(req.body.user, (err, createdUser) => {
    if (err) {
      logger.log(
        "error",
        "error creating new user with username " +
          req.body.user.username +
          " at " +
          Date.now()
      );
      res.status(200).send({ error: "User already exists" });
    } else {
      createdUser.password = undefined;
      logger.log(
        "info",
        "sending user back after creation with username " +
          req.body.user.username
      );
      res.status(200).send({ user: createdUser });
    }
  });
});

module.exports = router;
