const { model, Schema } = require("mongoose");

const Task = model(
  "Task",
  new Schema({ title: String, description: String, status: String })
);

module.exports = Task;
