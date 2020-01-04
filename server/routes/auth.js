const express = require("express"),
  bcrypt = require("bcrypt"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  router = express.Router(),
  winston = require("winston"),
  saltRounds = parseInt(process.env.saltRounds);

const User = require("../models/user");

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

router.post("/login", (req, res) => {
  console.log("req", req.body);
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
    } else {
      res.status(200).send({ user: createdUser });
    }
  });
});

module.exports = router;
