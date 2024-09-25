import { getAllTasksHandler, getTaskByIdHandler, addNewTaskHandler, updateTaskByIdHndler, deleteTaskByIdHandler, notFoundHandler } from './controller/tasksController.js';
import { logger, jsonMiddleware } from './middleware/tasksMiddleware.js';
import { createServer } from 'node:http';
import dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT || 8000;

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === '/api/tasks' && req.method === 'GET') {
        getAllTasksHandler(req, res);
      } else if (req.url.match(/^\/api\/task\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/) && req.method === 'GET') {
        getTaskByIdHandler(req, res);
      } else if (req.url === '/api/task' && req.method === 'POST') {
        addNewTaskHandler(req, res);
      } else if (req.url.match(/^\/api\/task\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/) && req.method === 'DELETE') {
        deleteTaskByIdHandler(req, res);
      } else if (req.url.match(/^\/api\/task\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/) && req.method === 'PUT') {
        updateTaskByIdHndler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, _ => {
  console.log(`Server running now on http://localhost:${PORT}`);
});
