import mongoose from "mongoose";

// los archivos ahora se guardan en una url
const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "users" },
  name: String,
  description: String,
  taskStatus: String,
  imageUrl: String,
  registerDate: { type: Date, default: Date.now },
});

const task = mongoose.model("tasks", taskSchema);
export default task;
