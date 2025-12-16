import express from "express";
import { TaskController } from "./controller/tasks.js";
import { TaskService } from "./services/task.js";

const app = express();
app.use(express.json());

const taskService = new TaskService();
const taskController = new TaskController(taskService);

app.get("/api/tasks", taskController.getAllTasks);
app.get("/api/tasks/:id", taskController.getTaskByID);
app.post("/api/tasks", taskController.addNewTask);

export default app;
