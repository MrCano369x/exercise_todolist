const { model, Schema } = require("mongoose");

const Task = model(
  "Task",
  new Schema({
    title: String,
    description: String,
    status: { type: String, default: "pending" },
  })
);

module.exports = Task;
