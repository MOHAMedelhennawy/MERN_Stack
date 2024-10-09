import { v4 as uuidv4 } from 'uuid';
import { getDB, insertDB, saveDB} from '../config/db.js'

// getTaskById
export const getTaskById = async (id) => {
    try {
        const { tasks } = await getDB();
        const task = tasks.find(task => task.id === id);
    
        if (task) {
            return task
        } else {
            throw new Error(`Task with id ${id} not found`);
        }

    } catch (error) {
        throw new Error(`Fialed to retrieve task: ${error.message}`);
    }
}

// getAllTasks
export const getAllTasks = async () => {
    try{
        const { tasks } = await getDB();
        return tasks
    } catch (error) {
        throw new Error(`Fialed to retrieve tasks: ${error.message}`);
    }
}

// addNewTask
export const addNewTask = async (task) => {
    try {
        const tasks = await getAllTasks();
        const newTask = {
            id: uuidv4(),
            content: task
          }

        if (tasks && Array.isArray(tasks)) {
            tasks.push(newTask);
            await saveDB({tasks: tasks});
        } else {
            throw new Error(`Tasks should be an array.`);            
        }

        return newTask;
    } catch (error) {
        throw new Error(`Failed to add a new task: ${error.message}`);
    }
}

// updateTask
export const updateTask = async (id, content) => {
    try {
        const tasks = await getAllTasks();
        const matches = tasks.find(task => task.id === id)
    
        if (matches) {
            matches.content = content;
            await saveDB({tasks: tasks})
        } else {
            throw new Error(`Task with id ${id} not found`);
            
        }
    } catch (error) {
        throw new Error(`Fialed to update task: ${error.message}`);        
    }
}

// deleteTaskById
export const deleteTaskById = async (id) => {
    try {
        const tasks = await getAllTasks();
    
        if (Array.isArray(tasks)) {
            const newTasks = tasks.filter(task => task.id !== id)

            if (!newTasks) {
                throw new Error(`Task with id ${id} not found`);
            }

            saveDB({tasks: newTasks});
            console.log('Deleted Successfully!')
            
        } else {
            throw new Error(`Tasks should be array.`);
        }
    
    } catch (error) {
        throw new Error(`Faield to delete task: ${error.message}`);
    }
}