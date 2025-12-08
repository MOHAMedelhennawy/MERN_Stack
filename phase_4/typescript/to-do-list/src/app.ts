import express from "express";
import { addNewTaskController, getAllTasksController, getTaskByIdController } from "./controllers/task.ts";

const app = express();

app.use(express.json());

app.get("/task", getAllTasksController);
app.get("/task/:id", getTaskByIdController);
app.post("/task", addNewTaskController);

export default app;