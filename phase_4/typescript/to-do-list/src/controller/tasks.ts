import { Request, Response } from "express";
import { TaskService } from "../services/task.js";

export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	public getAllTasks = async (_req: Request, res: Response) => {
		try {
			const tasks = await this.taskService.getAllTasks();
			return res.status(200).json(tasks);
		} catch (error) {
			return res.status(500).json({ message: "Internal server error" });
		}
	};

	public getTaskByID = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(400).json({ message: "Task id is required" });
			}

			const task = await this.taskService.getTaskByID(id);

			if (!task) {
				return res.status(404).json({ message: "Task not found" });
			}

			return res.status(200).json(task);
		} catch (error) {
			return res.status(500).json({ message: "Internal server error" });
		}
	};

	public addNewTask = async (req: Request, res: Response) => {
		try {
			const { title } = req.body;

			if (!title) {
				return res.status(400).json({ message: "Task title is required" });
			}

			const task = await this.taskService.addNewTask(title);

			return res.status(201).json({
				message: "Task created successfully",
				task,
			});
		} catch (error) {
			return res.status(500).json({ message: "Internal server error" });
		}
	};
}
