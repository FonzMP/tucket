const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();

const Project = require('../models/project')

router.use(cors())

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

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
  Project.findByIdAndDelete(id, function (err, project) {
    if (err) {
      console.log('error in project deletion', err)
    } else {
      res.send(project)
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