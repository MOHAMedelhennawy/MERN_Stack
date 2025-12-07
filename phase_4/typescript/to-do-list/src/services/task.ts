import tasksDomData from "../data/tasks.ts";
import type { ITask } from "../models/task.ts";

export const getAllTasksService = (): ITask[] => {
    return tasksDomData;
};

export const getTaskByIDService = (id: string): ITask => {
    const res = tasksDomData.find((task) => task.id === id);
    if (!res) {
        throw new Error("Task not found");
    }

    return res;
};
