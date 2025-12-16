import { TaskStatus } from "../../generated/prisma/client/index.js";

export interface ITask {
    id: string;
    title: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
};
