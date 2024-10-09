import Ajv from 'ajv';
import config from 'dotenv/config';
import express, { query } from 'express';
import { addNewTask, deleteTaskById, getAllTasks, getTaskById, updateTask } from './controller/tasks.js';

const app = express();
const PORT = process.env.PORT || 8000;
const schema = {
    type: "object",
    properties: {
        title: { type: "string" }
    },
    required: ["title"]
};

const ajv = new Ajv();
let validators = ajv.compile(schema);

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// get all tasks
// GET => /api/tasks
// GET => /api/tasks?limit=10
app.get('/api/tasks', async (req, res, next) => {
    try{
        const tasks = await getAllTasks();
        const limit = parseInt(req.query.limit);
    
        if (Number.isInteger(limit) && limit > 0) {
            return res.json(tasks.slice(0, limit))
        }
    
        res.json(tasks)
    } catch (error) {
        next(error)
    }
})

// get task with id
// GET => /api/task/<id>
app.get('/api/task/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await getTaskById(id);

        res.json(task);
    } catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).json({message: error.message});
        } else {
            res.status(500).json({message: 'Internal server error'})
        }
    }
})

// add new task
// POST => /api/task    &&    req.body = {title: "<title>"}
// POST => /api/task?title=<title>
app.post('/api/task', async (req, res, next) => {
    try {
        let taskTitle = req.body?.title || req.query?.title;
        const validate = req.body && validators(req.body);

        if (!validate) {
            return res.status(403).json({ message: 'Validation failed: invalid input' });
        }
        if (!taskTitle) {
            return res.status(400).json({ message: 'Task title is required' });
        }

        // Add new task
        const newTask = await addNewTask(taskTitle);
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});


// update task with id
// PUT => /api/task/<id>    &&      req.body = {title: <title>}
// PUT => /api/task/<id>?title=<title>
app.put('/api/task/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await getTaskById(id);
        const newTitle = req.query.title || req.body.title;

        if (!newTitle) {
            return res.status(400).json({ message: 'Task title is required' });
        }

        task.content = newTitle;
        await updateTask(id, newTitle);

        res.status(200).json({message: `Task updated successfully`, task: task})
    } catch (error) {
        res.status(500).json({message: `Internal server error: ${error.message}`})
    }
})

// DELETE => /api/task/:id
app.delete('/api/task/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        await deleteTaskById(id);
        res.status(200).json({message: `Task deleted successfully`})
    } catch (error) {
        res.status(500).json({message: `Internal server error: ${error.message}`})
    }
})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
