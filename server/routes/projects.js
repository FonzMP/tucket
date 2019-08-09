const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const winston = require("winston");

const Project = require('../models/project')
const Ticket = require('../models/ticket')

router.use(cors())

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize({ all: true })
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

router.get("/:id", function (req, res) {
  const id = req.params.id
  Project.findById(id, function (err, project) {
    if (err) {
      console.log('error in project creation ', err)
    } else {
      res.send(project)
    }
  })
});

router.delete("/:id", function (req, res) {
  const id = req.params.id
  let deleted = [];
  Project.findById(id, function (err, projectFound) {
    if (projectFound && projectFound.tickets.length > 0) {
      projectFound.tickets.map(ticket => {
        Ticket.findByIdAndDelete(ticket._id, (errDel, ticketDeleted) => {
          if (errDel) {
            logger.log('error', "error deleting ticket associated with project of id: " + id + " by error " + errDel.message)
            console.log('error deleting ticket with id in project ', projectFound + ", " + errDel.message)
          } else {
            deleted.push(ticketDeleted.title)
          }
        })
      })
    }
    if (err) {
      console.log('trouble locating project in project deletion ', err.message)
      logger.log('error', 'trouble locating project in project deletion of id: ' + id + ' of error: ' + err.message)
    } else {
      Project.findByIdAndDelete(id, function (err, project) {
        if (err) {
          console.log('error in project deletion', err)
        } else {
          if (projectFound && project) {
            res.send({ project: projectFound, deleted: deleted, error: errDetails });
          }
        }
      })
    }
  })
})

router.put("/:id", function (req, res) {
  const id = req.params.id
  const projectIn = req.body.project
  Project.findByIdAndUpdate(id, projectIn, function (err, succ) {
    if (err) {
      console.log('error in project deletion', err)
    } else {
      Project.findById(id, function (err, project) {
        if (project) {
          res.send(project)
        } else {
          console.log('missed finding after update ', err)
        }
      })
    }
  })
})

router.post("/new", function (req, res) {
  const project = req.body.project
  Project.create(project, function (err, successProject) {
    if (err) {
      console.log('error in project creation ', err)
    } else {
      res.send(successProject)
    }
  })
});

router.get("/", function (req, res) {
  Project.find({}, function (err, allProjects) {
    if (err) {
      console.log('error in project get ', err)
    } else {
      res.send(allProjects)
    }
  })
});

module.exports = router;