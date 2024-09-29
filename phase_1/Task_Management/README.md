# Task Manager REST API

This is a simple RESTful API built with vanilla Node.js for managing tasks. The API allows to create, read, update, and delete tasks.

## Features

- **Create Task**: Add a new task to the system.
- **Get All Tasks**: Retrieve all tasks.
- **Get Task by ID**: Retrieve a single task by its ID.
- **Update Task**: Update a task's content by its ID.
- **Delete Task**: Remove a task by its ID.

## API Endpoints

### Get All Tasks

- **URL**: `/api/tasks`
- **Method**: `GET`
- **Response**: A list of all tasks.
- **Status Codes**:
  - `200 OK`: Successfully fetched the tasks.
  - `500 Internal Server Error`: Error fetching the tasks.

### Get Task by ID

- **URL**: `/api/task/:id`
- **Method**: `GET`
- **Response**: A single task by its ID.
- **Status Codes**:
  - `200 OK`: Task found.
  - `404 Not Found`: Task not found.
  - `500 Internal Server Error`: Error fetching the task.

### Create a New Task

- **URL**: `/api/task`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "content": "New task content"
  }
  ```
- **Response**: A confirmation message upon successful creation.
- **Status Codes**:
  - `201 Created`: Task successfully added.
  - `400 Bad Request`: Invalid task data.


### Update Task by ID

- **URL**: /api/task/:id
- **Method**: PUT
- **Request Body**:
    ```json
    {
    "content": "Updated task content"
    }
    ```
- **Response**: A confirmation message upon successful update.
- **Status Codes**:

  - `201 Created`: Task successfully updated.
  - `400 Bad Request`: Invalid task data.
  - `404 Not Found`: Task not found.


### Delete Task by ID

- **URL**: /api/task/:id
- **Method**: DELETE
- **Response**: A confirmation message upon successful deletion.
- **Status Codes**:
   - `204 No Content`: Task successfully deleted.
   - `404 Not Found`: Task not found.
   - `500 Internal Server Error`: Error deleting the task.