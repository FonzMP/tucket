const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Ticket = require('mongoose').model('ticket').schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  tickets: [Ticket]
})

module.exports = mongoose.model("project", projectSchema)