import express from "express";
import { getAllTasksController } from "./controllers/task.ts";

const app = express();

app.use(express.json());

app.get("/task", getAllTasksController);
export default app;