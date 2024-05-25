# Todo Application

This project is a Todo application that allows users to manage their personal tasks. Users can add, edit, delete, and view their tasks. The project consists of a backend built with Node.js and Express, and a frontend built with React.

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Setup](#setup)
4. [Backend Services](#backend-services)
5. [Frontend Application](#frontend-application)
6. [API Endpoints](#api-endpoints)

## Features

- User authentication
- Add tasks
- Edit tasks
- Delete tasks
- List tasks

## Requirements

- Node.js (>= 12.x)
- npm (>= 6.x)
- MongoDB

## Setup

### Backend Setup

1. Navigate to the project directory:
    ```bash
    cd backend
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and add the required environment variables:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/todoapp
    JWT_SECRET=your_secret_key
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the project directory:
    ```bash
    cd frontend
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Start the frontend application:
    ```bash
    npm start
    ```

## Backend Services

### User Authentication

- **Register**
  - URL: `/api/auth/register`
  - Method: `POST`
  - Body: `{ "username": "your_username", "password": "yourpassword" }`
  - Description: Creates a new user.

- **Login**
  - URL: `/api/auth/login`
  - Method: `POST`
  - Body: `{ "username": "your_username", "password": "yourpassword" }`
  - Description: Logs in a user and returns a token.

### Todo Operations

- **Get User's Todos**
  - URL: `/api/todos/user/todos`
  - Method: `GET`
  - Headers: `{ "Authorization": "Bearer <token>" }`
  - Description: Retrieves the todos of the logged-in user.

- **Add Todo**
  - URL: `/api/todos`
  - Method: `POST`
  - Headers: `{ "Authorization": "Bearer <token>" }`
  - Body: FormData with `title`, `description`, `tags`, and `image`
  - Description: Adds a new todo. Supports optional tags and image upload.

- **Edit Todo**
  - URL: `/api/todos/:id`
  - Method: `PUT`
  - Headers: `{ "Authorization": "Bearer <token>" }`
  - Body: FormData with `title`, `description`, `tags`, and `image`
  - Description: Edits an existing todo. Supports optional tags and image update.

- **Delete Todo**
  - URL: `/api/todos/:id`
  - Method: `DELETE`
  - Headers: `{ "Authorization": "Bearer <token>" }`
  - Description: Deletes a specified todo.

## Frontend Application

### User Login and Registration

1. Register and login from the user interface using only `username` and `password`.
2. After logging in, the received token is used to make requests.

### Task Management

1. **Listing and Adding:**
   - Tasks are listed after the user logs in. Use the `Add Todo` button to add new tasks.
   - New tasks can include a title, description, optional tags (comma-separated), and an optional image.

2. **Editing:**
   - Use the `Edit` button next to each task to enter edit mode.
   - Update the task details including title, description, tags, and image.
   - Click the `Save` button to save changes.

3. **Deleting:**
   - Use the `Delete` button next to each task to delete the task.
   - A confirmation modal will appear to confirm the deletion.

### Workspace

- **Listing and Adding:** Tasks are listed after the user logs in. Use the `Add Todo` button to add new tasks.
- **Editing:** Use the `Edit` button next to each task to enter edit mode.
- **Deleting:** Use the `Delete` button next to each task to delete the task, with a confirmation modal.

## API Endpoints

### Auth

- **POST** `/api/auth/register`
- **POST** `/api/auth/login`

### Todos

- **GET** `/api/todos/user/todos`
- **POST** `/api/todos`
- **PUT** `/api/todos/:id`
- **DELETE** `/api/todos/:id`

If you encounter any issues or have any contributions, please feel free to contact us. Enjoy using the application!
