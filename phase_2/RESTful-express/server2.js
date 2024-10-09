import Ajv from 'ajv';
import config from 'dotenv/config';
import express from 'express';
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
app.use(express.static("public")) // => http://localhost:8000/readme.txt

/**
 * Explanation of how `express.static` works:
 * If the request matches a file in the "public" directory and the file is 
 * successfully served by `express.static("public")`, the response is 
 * finished and the `custom middleware` will not execute.
 * 
 * However, if the file is not found or the request doesn't match any file 
 * in the "public" directory, the `custom middleware` will execute.
 * 
 * Execution Order:
 * 1. `express.static` will try to serve the file first.
 * 2. If the file is found, it sends the response and the request stops here.
 * 3. If the file is not found, the `custom middleware` will execute.
 */

// `Custom middleware` (Application-level middleware)
app.use((req, res, next) => {
    console.log(`I'm a custom middleware, I run for any request unless a response is already sent.`);
    
    next(); // Pass the request to the next middleware or route handler
});

/**
 * In this case, the custom middleware will execute first,
 * and then `express.static("/public")` will run for requests starting with `/help`.
 */
app.use('/help', express.static("public"))    // => http://localhost:8000/help/readme.txt


// This just for practice
// To handle all get requests
app.get('*', (req, res, next) => {
    console.log(`i'm a middleware for any get request`)
    next(); // next to move to the next request middleware
})

app.post('*', (req, res, next) => {
    console.log(`i'm a middleware for any post request`)
    next(); // next to move to the next request middleware
})

app.all('/api/task/:id', (req, res, next) => {
    console.log(`i'm a middleware for any request with '/api/task/:id' endpoint`)
    console.log(`Method: ${req.method}`)
    console.log('===================')
    next();
})

// Validate middleware
const validateTask = (req, res, next) => {
    const taskTitle = req.body.title || req.query.title;

    // Check if title exists in either body or query
    if (!taskTitle) {
        return res.status(400).json({ message: 'Task title is required' });
    }

    // Validate the task title according to the schema
    const validate = validators({ title: taskTitle });
    
    if (!validate) {
        return res.status(400).json({ message: 'Validation failed: invalid input' });
    }
    
    next();
};

// Utility functions
const getTaskTitle = (req) => {
    const title = req.body.title || req.query.title;
    console.log(title, '----------------------')
    return title;
}

// Get task from body middleware
const ensureTaskTitle = (req, res, next) => {
    const taskTitle = getTaskTitle(req);
    console.log(taskTitle)
    if (!taskTitle) {
        return res.status(400).json({ message: 'Task title is required' });
    }

    req.title = taskTitle;
    next()
}

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
        return next(error);
    }
})

// get task with id
// GET => /api/task/<id>
app.get('/api/task/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await getTaskById(id);
        res.cookie("username", Buffer.from(req.body.fname).toString('base64'))
        res.cookie("age", 22)
        res.json(task);
    } catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).json({message: error.message});
        } else {
            return next(error);
        }
    }
})

// add new task
// POST => /api/task    &&    req.body = {title: "<title>"}
// POST => /api/task?title=<title>
app.post('/api/task', validateTask, ensureTaskTitle, async (req, res, next) => {
    try {
        let taskTitle = req.title;
        // Add new task
        const newTask = await addNewTask(taskTitle);
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        return next(error);
    }
});


// update task with id
// PUT => /api/task/<id>    &&      req.body = {title: <title>}
// PUT => /api/task/<id>?title=<title>
app.put('/api/task/:id', validateTask, ensureTaskTitle, async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await getTaskById(id);
        const newTitle = req.title;

        task.content = newTitle;
        await updateTask(id, newTitle);

        res.status(200).json({message: `Task updated successfully`, task: task})
    } catch (error) {
        return next(error);
    }
})

// DELETE => /api/task/:id
app.delete('/api/task/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        await deleteTaskById(id);
        res.status(200).json({message: `Task deleted successfully`})
    } catch (error) {
        return next(error);
    }
})

// error handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({message: 'Internal server error'})
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
