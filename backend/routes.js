const { isValidObjectId } = require("mongoose");
const Task = require("./models/Task");

const escape = (html) => {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const validateTask = ({ title, description }) => {
  if (!title) return "missing title";
  if (title.length < 10) return "title must be at least 10 characters";
  if (title.length > 120) return "title must be less than 120 characters";

  if (!description) return "missing description";
  if (description.length < 100)
    return "description must be at least 100 characters";
  if (description.length > 1000)
    return "description must be less than 1000 characters";

  return { title, description: escape(description) };
};

module.exports = (app) => {
  app.get("/tasks_total", async (req, res) => {
    const total = await Task.find().count();
    const pages = Math.ceil(total / 15);
    res.json({ success: true, total, pages, msg: "Tasks found" });
  });

  app.get("/tasks/:page", async (req, res) => {
    const tasks = await Task.find()
      .limit(15)
      .skip((req.params.page - 1) * 15);

    if (tasks.length == 0)
      return res.status(404).json({ success: false, msg: "Tasks not found" });

    res.status(200).json({ success: true, tasks, msg: "Tasks obtained" });
  });

  app.post("/tasks", async (req, res) => {
    const isvalid = validateTask(req.body);

    if (typeof isvalid == "string")
      return res.status(404).json({ success: false, msg: isvalid });

    const task = await Task.create(isvalid);
    res.status(200).json({ success: true, task, msg: "Task created" });
  });

  app.delete("/tasks/:id", async (req, res) => {
    if (!isValidObjectId(req.params.id))
      return res.status(404).json({ success: false, msg: "Invalid id" });

    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task)
      return res.status(404).json({ success: false, msg: "Task not found" });

    res.json({ success: true, msg: "Task deleted successfully" });
  });

  app.put("/tasks/:id", async (req, res) => {
    if (!isValidObjectId(req.params.id))
      return res.status(404).json({ success: false, msg: "Invalid id" });

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task)
      return res.status(404).json({ success: false, msg: "Task not found" });

    res.json({ success: true, task, msg: "Task updated successfully" });
  });
};
