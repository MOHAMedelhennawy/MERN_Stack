import { getAllTasksService, getTaskByIDService } from "../services/task.ts";

export const TaskStatus = {
    PENDING: 'pending',
    COMPLETED: 'completed'
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface ITask {
    id: string;
    title: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
};

interface ITaskMethods {
    // Get all tasks
    getAllTasks(): ITask[];
    // get task by id
    getTaskByID(id: string): ITask;
    // add new task
    // addNewTask(data: ITask): ITask;
    // // update task name
    // updateTaskStatus(id: string, status: TaskStatus): ITask;
    // // update task status
    // updateTaskName(id: string, name: TaskStatus): ITask;
    // // delete task
    // deleteTaskBydID(id: string): boolean;
    // // clean all tasks
    // cleanAllTasks(): boolean;
}

class Task implements ITask, ITaskMethods {
    id: string;
    title: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
        this.status = TaskStatus.PENDING;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static getAllTasks(): ITask[] {
        return getAllTasksService();
    }
    // // get task by id
    getTaskByID(): ITask {
        if (!this.id) {
            throw new Error("Task id is missing");
        }

        return getTaskByIDService(this.id);
    }
    // // add new task
    // addNewTask(data: ITask): ITask;
    // // update task name
    // updateTaskStatus(id: string, status: TaskStatus): ITask;
    // // update task status
    // updateTaskName(id: string, name: TaskStatus): ITask;
    // // delete task
    // deleteTaskBydID(id: string): boolean;
    // // clean all tasks
    // cleanAllTasks(): boolean;

}

export default Task;