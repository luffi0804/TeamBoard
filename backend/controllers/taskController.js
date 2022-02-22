import task from "../models/task.js";
import user from "../models/user.js";

const registerTask = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  const idTask = await user.findOne({ name: req.body.user });
  if (!idTask) return res.status(400).send({ message: "User no register" });

  const taskSchema = new task({
    user: req.body.user,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
    imageUrl: "",
  });

  const result = await taskSchema.save();

  return !result
    ? res.status(500).send({ message: "Failed to register task" })
    : res.status(200).send({ message: "Task register" });
};

const registerStatusTask = async (req, res) => {
  if (!req.body.taskStatus)
    return res.status(400).send({ message: "Incomplete data" });

  let taskSchema = new task({
    taskStatus: req.body.taskStatus,
  });
  let taskResult = await taskSchema.save();
  return !taskResult
    ? res.status(500).send({ message: "Failed to register status task" })
    : res.status(200).send({ taskResult });
};

const taskList = async (req, res) => {
  let tasks = await task.find();

  return tasks.length === 0
    ? res.status(400).send({ message: "No search result" })
    : res.status(200).send({ tasks });
};

const deleteTask = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const tasks = await task.findByIdAndDelete(req.params["_id"]);

  return !tasks
    ? res.status(400).send({ message: "Error deleting task" })
    : res.status(200).send({ message: "Task deleted" });
};

const updateStatustask = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.taskStatus)
    return res.status(400).send({ message: "Incomplete data" });

  let status = "";
  if (!req.body.taskStatus) {
    const findTask = await task.findOne({ name: req.body.name });
    status = findTask.taskStatus;
  } else {
  }

  const taskEdit = await task.findByIdAndUpdate(req.body._id, {
    taskStatus: req.body.taskStatus,
  });
  return !taskEdit
    ? res.status(400).send({ message: "Error changin status task" })
    : res.status(200).send({ message: "Task Changed" });
};

export default {
  registerTask,
  taskList,
  deleteTask,
  updateStatustask,
  registerStatusTask,
};
