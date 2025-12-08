import type { Request, Response, NextFunction } from "express";
import Task, { type ITask } from "../models/task.ts";

export const getAllTasksController = (req: Request, res: Response, next: NextFunction) => {
    const result: ITask[] = Task.getAllTasks();

    res.send(result).status(200);
}

export const getTaskByIdController = (req: Request, res: Response, next: NextFunction) => {
    const id: string | undefined = (req.params?.id)?.toString();

    if (!id)
        throw new Error("Task id is missing");

    const task: ITask | null = Task.getTaskByID(id);
    res.status(200).json(task);
};

export const addNewTaskController = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, title } = req.body;
        const task: Task = new Task(id, title);
        const tasks: ITask[] = Task.getAllTasks();

        res.json(tasks).status(200);
    } catch (error) {
        throw new Error(`Server error: ${error}`);
    }
}