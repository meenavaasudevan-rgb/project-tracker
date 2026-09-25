# 🚀 Project Tracker

Project Tracker is a full-stack web application for managing projects and tasks in one place.

Users can register and log in securely, create and manage projects, create and manage tasks, track project progress, search and filter tasks, and view project/task information through a dashboard.

---

## 🌐 Live Application

https://project-tracker-7xrx.onrender.com

## 📂 GitHub Repository

https://github.com/meenavaasudevan-rgb/project-tracker.git

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Password hashing using bcrypt
- Protected backend routes
- User-specific project and task data

### 📁 Project Management

- Create projects
- View projects
- Update project status
- Delete projects
- Track project status

### ✅ Task Management

- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Assign tasks
- Set task priority
- Set task due date
- Update task status
- Search tasks
- Filter tasks by status

### 📊 Dashboard

The dashboard provides an overview of:

- Total projects
- Total tasks
- Projects in progress
- Completed projects
- Pending projects
- Task status information

### 🤖 AI Assistant

The application includes an AI Assistant section for project-related assistance.

### 📈 Analytics

The application includes an Analytics section for viewing project/task information.

---

## 🛠️ Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Icons
- Redux Toolkit
- React Redux
- Redux Persist
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv

### Database

- MongoDB
- MongoDB Atlas

### Deployment

- Render
- GitHub Actions

---

## 📂 Project Structure

```text
project-tracker/
│
├── app/
│   ├── ai/
│   ├── analytics/
│   ├── components/
│   ├── create/
│   ├── dashboard/
│   ├── login/
│   ├── projects/
│   ├── redux/
│   ├── register/
│   ├── tasks/
│   └── track/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── public/
├── package.json
├── .gitignore
└── README.md