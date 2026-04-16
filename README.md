# StudyFlow AI 🚀

A fullstack project built with React, Express and SQLite, extended with basic AI functionality.

## 📌 About the project

StudyFlow is a task management application where users can create, update and manage study tasks.

The project has been extended with an AI route and is intended to evolve into an AI-assisted system with guardrails, RAG concepts and secure handling of user input.

## 🧰 Tech stack

- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: SQLite
- API communication: Fetch
- Version control: Git & GitHub

## ⚙️ Features

- Create, update and delete tasks
- Fullstack communication (frontend ↔ backend)
- SQLite database integration
- AI route (`/api/ai`) for future AI features

## 🤖 AI & future development

Planned improvements:

- AI-generated task suggestions
- Guardrails for safe AI usage (input/output filtering)
- Exploration of RAG (Retrieval Augmented Generation)
- Possible migration to MongoDB + Mongoose

## 🚀 Getting started

### Install dependencies

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

## Run the project

```bash
npm run dev
```

### Backend runs on:

http://localhost:5001

### Fronend runs on:

http://localhost:5173

## 📡 API

### Tasks

```bash
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

AI
POST /api/ai
``` 

💡 Purpose

This project is built as part of learning fullstack development and exploring how AI can be integrated into real-world applications in a controlled and secure way.

