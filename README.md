# Course Management System

Full-stack CRUD app: React (Vite) frontend + Node.js/Express backend + MongoDB.
The frontend never touches the database directly — every read/write goes through the REST API.

```
course-management-system/
├── backend/     Express API + Mongoose models
└── frontend/    React app (Vite + React Router)
```

## 1. Backend setup
cd backend
npm install


Requires a running MongoDB instance. Default `.env` points to `mongodb://127.0.0.1:27017/course_management`.
For MongoDB Atlas, replace `DATABASE_URL` with your connection string.

### API

| Method | Route             | Description             |
|--------|--------------------|--------------------------|
| GET    | /courses           | List all courses         |
| GET    | /courses/:id       | Get one course           |
| POST   | /courses           | Create a course          |
| PUT    | /courses/:id       | Update a course          |
| DELETE | /courses/:id       | Delete a course          |
| GET    | /health            | Health check             |

## 2. Frontend setup

cd frontend
npm install
npm run dev                 # http://localhost:5173


Pages: catalog list (`/`), add course (`/courses/new`), course details (`/courses/:id`), edit (`/courses/:id/edit`).

## 3. Run both

Two terminals: backend on :5000, frontend on :5173. The frontend's `.env` must point at the backend's URL.
