const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("project", projectSchema);
