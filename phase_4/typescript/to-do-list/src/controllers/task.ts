import type { Request, Response, NextFunction } from "express";
import Task, { type ITask } from "../models/task.ts";

export const getAllTasksController = (req: Request, res: Response, next: NextFunction) => {
    const result: ITask[] = Task.getAllTasks();

    res.send(result).status(200);
}