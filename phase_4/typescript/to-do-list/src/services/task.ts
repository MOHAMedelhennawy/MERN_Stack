import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export class TaskService {
    public async getAllTasks() {
        return prisma.findMany.Task();
    };

    public async getTaskByID(id: string) {
        return prisma.findMany.Task({
            where: { id }
        });
    };

    public async deleteTaskByID(id: string) {
        return prisma.delete.Task({
            where: { id },
        });
    };
}