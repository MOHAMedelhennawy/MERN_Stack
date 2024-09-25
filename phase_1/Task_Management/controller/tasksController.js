import { createNewTask, getAllTasks, getTaskByID, removeTaskByID, updateTaskByID } from '../models/tasks.js';
import { sendResponse } from '../helper/tasksHelper.js';

// Route handler for /api/tasks  => 'GET'
export const getAllTasksHandler = async (req, res) => {
  try {
    const data = await getAllTasks();
    sendResponse(res, 200, data);
  } catch (error) {
    sendResponse(res, 500, { message: 'Error fetching tasks' });
  }
};

// Route handler for /api/task/:id  => 'GET'
export const getTaskByIdHandler = async (req, res) => {
  const id = req.url.split('/')[3];

  try {
    const data = await getTaskByID(id);

    if (data) {
      sendResponse(res, 200, data);
    } else {
      sendResponse(res, 404, { message: 'Task not found' });
    }
  } catch (error) {
    sendResponse(res, 500, { message: 'Error fetching task' });
  }
};

// Route handler for /api/task/  => 'POST'
export const addNewTaskHandler = async (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      console.log(body);
      const data = JSON.parse(body).content;
      await createNewTask(data);
      sendResponse(res, 201, { message: 'Task added successfully!' });
    } catch (error) {
      sendResponse(res, 404, { message: 'Invalid task data' });
    }
  });
};

// Route handler for /api/task/:id => 'PUT'
export const updateTaskByIdHndler = async (req, res) => {
  let body = '';
  const id = req.url.split('/')[3];

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async _ => {
    try {
      const content = JSON.parse(body).content;
      await updateTaskByID(id, content);

      sendResponse(res, 201, { message: 'Task updated successfully!' });
    } catch (error) {
      sendResponse(res, 404, { message: 'Invalid task data' });
    }
  });
};

// Route handler for /api/task/:id => 'DELETE'
export const deleteTaskByIdHandler = async (req, res) => {
  const id = req.url.split('/')[3];

  try {
    await removeTaskByID(id);
    sendResponse(res, 204, { message: 'Task deleted successfully!' });
  } catch (error) {
    sendResponse(res, 404, { message: 'Error deleting data' });
  }
};

// not found erro handler
export const notFoundHandler = (req, res) => {
  res.statuCode = 404;
  res.write(JSON.stringify({ message: 'Not found' }));
  res.end();
};
