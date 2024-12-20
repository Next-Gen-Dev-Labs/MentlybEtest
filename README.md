# Issue Tracking System

This is a Node.js-based backend API for managing projects and issues in an issue tracking system. It includes features such as user authentication, role-based access control, project management, issue tracking, and more.

---

## Features

### User Management
- User Registration
- Login with JWT Authentication
- Role-based Access Control (Admin, Project Manager, Developer)

### Project Management
- Create, List, Update, and Delete Projects

### Issue Management
- Create and List Issues with Filtering and Pagination
- Update Issue Status
- Assign Issues to Users
- Add Comments to Issues

---

## Technologies Used
- **Node.js** with **Express.js** for server-side development
- **MongoDB** as the database
- **JWT** for authentication
- **Docker** for containerization
- **Jest** for testing

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (optional)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/issue-tracker.git
   cd issue-tracker


   git clone https://github.com/your-username/issue-tracker.git
   cd issue-tracker
Install dependencies:

bash
Copy code
npm install
Create an .env file and add the following variables:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/issuetracker
JWT_SECRET=your_jwt_secret
Start the development server:

bash
Copy code
npm run dev
Access the API at http://localhost:5000.

## API Endpoints
### User
POST /api/users/signup - Register a new user.
POST /api/users/login - Log in and get a JWT.
GET /api/users/profile - Get logged in user profile

### Projects
POST /api/projects - Create a new project (Admin/Project Manager only).
GET /api/projects - List all projects.
PATCH /api/projects/:id - Update project details (Admin/Project Manager only).
DELETE /api/projects/:id - Delete a project (Admin only).

### Issues
POST /api/issues - Create an issue.
GET /api/issues - List issues with filtering and pagination.
PATCH /api/issues/:id - Update issue status.
PUT /api/issues/:id/assign - Assign an issue to a user.
POST /api/issues/:id/comments - Add a comment to an issue.

Testing
Run tests using Jest:

bash
Copy code
npm test
Docker Usage
Build and run the application using Docker Compose:

bash
Copy code
docker-compose up --build
Access the API at http://localhost:5000.

License
This project is licensed under the MIT License. See the LICENSE file for details.

yaml
Copy code

---

## **Docker Compose Example**

**`docker-compose.yml`**

```yaml
version: '3.9'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/issuetracker
      - JWT_SECRET=your_jwt_secret
    depends_on:
      - mongo

  mongo:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
Dockerfile

dockerfile
Copy code
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
Test Cases
Unit Tests: User Registration

tests/auth.test.js

javascript
Copy code
const request = require('supertest');
const app = require('../server');

describe('Authentication API', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'Admin',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should not register a user with missing fields', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'jane@example.com',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Validation failed');
  });
});
Integration Tests: Project Management

tests/project.test.js

javascript
Copy code
const request = require('supertest');
const app = require('../server');

describe('Project API', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@example.com',
      password: 'admin123',
    });
    token = res.body.token;
  });

  it('should create a new project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Project',
        description: 'This is a new project.',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'New Project');
  });

  it('should not create a project without a valid token', async () => {
    const res = await request(app).post('/api/projects').send({
      name: 'Unauthorized Project',
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Not authorized, no token');
  });
});
These examples provide a comprehensive structur