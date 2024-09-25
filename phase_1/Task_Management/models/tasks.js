import { getDB, saveDB, insertDB } from '../config/db.js'
import {v4 as uuidv4} from 'uuid'

export const getAllTasks = async () => {
    const { tasks } = await getDB();
    return tasks;
}

export const createNewTask = async (content) => {
    const data = {
        id: uuidv4(),
        content,
    }

    await insertDB(data);
    return data;
}

export const getTaskByID = async (id) => {
    const { tasks } = await getDB();
    const matches = tasks.filter(task => task.id == id);

    return matches;
}

export const findTask = async (filter) => {
    const { tasks } = await getDB();
    const matches = tasks.filter(task => task.content.toLowerCase().includes(filter.toLowerCase()));

    return matches;
}

export const removeTaskByID = async (id) => {
    const { tasks } = await getDB();
    const matches = tasks.filter(task => task.id == id);

    if (matches) {
        const newTasks = tasks.filter(task => task.id !== id)
        await saveDB({tasks: newTasks})
    }
}

export const updateTaskByID = async (id, content) => {
    const { tasks } = await getDB();
    const matches = tasks.find(task => task.id === id);

    if (matches) {
        matches.content = content;
        const newTasks = tasks;

        await saveDB({tasks: newTasks})
    }
}

export const clearDB = async _ => await saveDB({tasks: []})