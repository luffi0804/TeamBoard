import task from "../controllers/taskController.js";
import express from "express";
const router = express.Router();

router.post("/registerTask", task.registerTask);
router.get("/taskList", task.taskList);
router.delete("/delete/:_id", task.deleteTask);
router.put("/updateStatusTask", task.updateStatustask);
router.post("/registerStatusTask", task.registerStatusTask)

export default router;
