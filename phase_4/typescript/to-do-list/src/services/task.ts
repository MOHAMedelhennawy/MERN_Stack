import {prisma} from "../utils/prismaClient.js";

export class TaskService {
	public async getAllTasks() {
		return await prisma.task.findMany();
	}

	public async getTaskByID(id: string) {
		return await prisma.task.findUnique({
			where: { id },
		});
	};

	public async addNewTask(title: string) {
		return await prisma.task.create({
			data: { title },
		});
	};
}