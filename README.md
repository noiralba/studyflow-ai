## 🚀 StudyFlow AI 

A fullstack application built with React, Express, and SQLite, extended with a basic AI endpoint and input validation.

---

## 📌 About the Project

StudyFlow is a task management application where users can create, update, and manage study tasks.

The project includes a simple AI endpoint (/api/ai) and focuses on building a structured backend with proper validation and separation of concerns.

---

## 🧰 Tech Stack

Frontend: React (Vite)  
Backend: Node.js + Express  
Database: SQLite  
API Communication: Fetch  
Version Control: Git & GitHub  

---

## ⚙️ Features

- Create, update, and delete tasks
- Fullstack communication (frontend ↔ backend)
- SQLite database integration
- AI endpoint with input validation

---

## 📁 Backend Structure

### The backend is structured as follows:

`server.js` – main server and route handling  

`utils/validatePrompt.js` – validation logic for AI input  

Validation logic is separated from route handling to improve readability and maintainability.

---

## 🔐 Environment Variables

The backend uses environment variables for configuration.

Create a .env file inside the backend folder:

`PORT=5001`

The server will use this port when starting.

---

## 🚀 Getting Started
#### Install Dependencies
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```
---

## ▶️ Run the Project
npm run dev

### Backend runs on:
http://localhost:5001

### Frontend runs on:
http://localhost:5173

---

## 📡 API

### Base URL
http://localhost:5001

---

## 📚 Task Endpoints

### GET /api/tasks
Fetch all tasks

### Response:

```res
[  
 {  
  "id": 1,  
  "title": "Learn React",  
  "course": "Frontend",  
  "status": "ongoing"  
 }  
]  
```
---

### POST /api/tasks
Create a new task

### Request:

```req
{  
 "title": "Learn API",  
 "course": "Backend",  
 "status": "planned"  
}  
```

---

### Response:

```res
{  
 "id": 2,  
 "title": "Learn API",  
 "course": "Backend",  
 "status": "planned"  
}  
```

---

### PUT /api/tasks/
Update existing task

---

### DELETE /api/tasks/
Delete a task

---

### 🤖 AI Endpoint

### POST /api/ai
Basic AI route with input validation

### Request:

```req
{ "prompt": "give me a study task" }
```

---

### Response:

```res
{  
"message": "AI route is working",  
"promptReceived": "give me a study task"  
}
```

---

## 🔍 Validation Rules

### The AI endpoint validates input before processing:

```text
prompt must be a string  
empty input is rejected  
input is trimmed before use  
input length is limited  
certain keywords are blocked  
```

---

## 📡 Available Endpoints

GET /api/tasks     
POST /api/tasks    
PUT /api/tasks/:id     
DELETE /api/tasks/:id     

POST /api/ai  

---

## 💡 Purpose

This project is built to learn fullstack development and to explore how to structure backend logic, validate user input, and prepare for future AI integration in a controlled and maintainable way.
