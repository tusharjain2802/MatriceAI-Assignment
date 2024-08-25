# Project Management System

<br /> <div align="center"> <h3 align="center">Project Management System</h3> <p align="center"> A comprehensive platform to manage projects, tasks, and deadlines with role-based access control. <br /> <br /> <a href="https://matriceai-assignment-6dnd.onrender.com/">View Demo</a> </p> </div>

### About The Project

The Project Management System is designed to simplify project management by providing role-based access to administrators, project managers, and team members. Each user type has specific rights to manage and view projects, tasks, and deadlines. The system features robust JWT authentication and session management, ensuring secure and persistent access to the platform.

### Built With
- React
- Tailwind CSS
- Node.js
- MongoDB

### Prerequisites
Before you begin, ensure you have met the following requirements:

### Installation
Follow these steps to set up and run the project locally.

1. Clone the repository

```sh
git clone https://github.com/yourusername/project-management-system.git
```

2. Navigate to the client directory and install NPM packages

```sh
cd client
npm install
```

3. Navigate to the server directory and install NPM packages

```sh
cd ../server
npm install
```

4. Set up your .env file in the 'server' directory with the following:

```sh
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Set up your .env file in the 'client' directory with the following:

```sh
VITE_BACKEND_URL=http://localhost:5000/api
```

6. Run the application

- Start the frontend

```sh
cd client
npm run dev
```
- Start the backend
```sh
cd ../server
node app.js
```

7. Open your browser and go to http://localhost:5173 to access the frontend.

<!-- SYSTEM DESIGN -->

### System Design
- Backend Architecture
The backend is built using Node.js and Express.js, connected to a MongoDB database. The architecture follows a RESTful API pattern with JWT authentication for secure and persistent user sessions. Role-based middleware ensures that only authorized users can access specific routes and perform certain actions.

- Frontend Architecture
The frontend is built with React.js and styled using Tailwind CSS. Redux is used for state management, with redux-persist ensuring that user sessions persist even after a page refresh. The frontend interacts with the backend through Axios, handling all API requests securely with JWT tokens.

<!-- DATABASE SCHEMA -->

### Database Schema
- User Schema

```sh
const userSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
designation: { type: String, required: true }, // 'admin', 'project manager', 'team member'
isApproved: { type: Boolean, default: false },
});
```

- Project Schema

```sh
const projectSchema = new mongoose.Schema({
name: { type: String, required: true },
description: { type: String, required: true },
deadline: { type: Date, required: true },
teamLeader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
```

- Task Schema

```sh
const taskSchema = new mongoose.Schema({
name: { type: String, required: true },
description: { type: String },
deadline: { type: Date, required: true },
project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
```


### API Documentation

## Authentication Endpoints
* POST /api/auth/register
- Description: Registers a new user.
- Request Body:
```sh
{
"name": "John Doe",
"email": "john@example.com",
"password": "password123",
"designation": "team member"
}
Response: A success message or error.
```
* POST /api/auth/login
- Description: Logs in a user and returns a JWT.
- Request Body:

```sh
{
"email": "john@example.com",
"password": "password123"
}
Response: JWT token and user information.
```

## Admin Endpoints
* GET /api/admin/users/approved
- Description: Retrieves all approved users.
- Response: List of approved users.
* GET /api/admin/users/pending
- Description: Retrieves all pending user approval requests.
- Response: List of pending users.
* PUT /api/admin/users/approve/:id
- Description: Approves a user by ID.
- Response: Success message or error.
* DELETE /api/admin/users/:id
- Description: * Deletes a user by ID.
- Response: Success message or error.
Project Endpoints
* GET /api/projects
- Description: Retrieves all projects. Admins see all projects; project managers and team members see only their projects.
- Response: List of projects.
POST /api/projects
- Description: Creates a new project (Admin only).
- Request Body:

```sh
{
"name": "Project Alpha",
"- description": "A new project",
"deadline": "2024-12-31",
"teamLeader": "user_id",
"teamMembers": ["user_id_1", "user_id_2"]
}
- Response: The created project.
```
* PUT /api/projects/:id
- Description: Updates a project (Admin only).

- Response: The updated project.
* DELETE /api/projects/:id
- Description: * Deletes a project by ID (Admin only).
- Response: Success message or error.
Task Endpoints
* GET /api/tasks
- Description: Retrieves all tasks. Admins see all tasks; project managers and team members see only tasks for their projects.
- Response: List of tasks.
POST /api/tasks
- Description: Creates a new task (Admin and Project Managers).
Request Body:

```sh
{
"name": "Task Alpha",
"- description": "A new task",
"deadline": "2024-12-31",
"project": "project_id",
"assignedTo": ["user_id_1", "user_id_2"]
}
- Response: The created task.
```
* PUT /api/tasks/:id
- Description: Updates a task (Admin and Project Managers).
Request Body: Same as the POST /api/tasks endpoint.
- Response: The updated task.
* DELETE /api/tasks/:id
- Description: * Deletes a task by ID (Admin and Project Managers).
- Response: Success message or error.
Deadline Endpoints
* GET /api/deadlines/projects
- Description: Retrieves project deadlines, sorted by nearest deadline.
- Response: List of projects with deadlines.
* GET /api/deadlines/tasks/:projectId
- Description: Retrieves task deadlines for a specific project, sorted by nearest deadline.
- Response: List of tasks with deadlines for the given project.

<!-- TECHNOLOGIES USED -->

### Technologies Used
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB
- Authentication: JWT (JSON Web Token)
- State Management: Redux, Redux-Persist
- Styling: Tailwind CSS
