const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subtask = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  estimate: { type: String, required: true },
})

module.exports = mongoose.model("project", subtask)