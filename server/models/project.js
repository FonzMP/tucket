const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }]
});

module.exports = mongoose.model("project", projectSchema);
