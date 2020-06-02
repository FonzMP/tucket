const express = require("express"),
  bcrypt = require("bcrypt"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  jwt = require("jsonwebtoken"),
  router = express.Router(),
  saltRounds = parseInt(process.env.saltRounds);

const User = require("../models/user");
const logger = require("../config/logger");

router.use(cors());

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.user.username }, (err, userFound) => {
    console.log("hit login");
    if (err) {
      logger.log(
        "error",
        "error locating user with username " + req.body.user.username
      );
    } else {
      if (!!userFound) {
        bcrypt.compare(
          req.body.user.password,
          userFound.password,
          (err, result) => {
            {
              if (err) {
                logger.log("error", "invalid username and password combo");
                res
                  .status(200)
                  .send({ error: "Invalid username and password" });
                return;
              }
              console.log("before token ");
              userFound.password = undefined;
              const token = jwt.sign(
                { token: userFound.username },
                process.env.jwt_secret,
                { expiresIn: 60 * 60 }
              );
              console.log("token going ", token);
              res.status(200).send({ token: token, user: userFound });
            }
          }
        );
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
