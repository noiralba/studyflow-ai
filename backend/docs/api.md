## 📡 API Documentation – StudyFlow

### Base URL

http://localhost:5001

## Health Check

## GET /

Check if the API is running.

### Response (200)

"API is running"

## 📚 Tasks

## GET /api/tasks

Fetch all tasks with optional filtering, sorting and pagination.

## Query Parameters

### Parameter Type Description

course string Filter by course
status string Filter by status
sort string Sort by title, course, or status
limit number Limit number of results
offset number Skip a number of results

### Example

GET /api/tasks?course=Backend&status=done&sort=title&limit=5&offset=0

### Response (200)

```json
[
  {
    "id": 5,
    "title": "Learn React",
    "course": "Frontend",
    "status": "ongoing"
  }
]
```

### Error Responses

```json
{
  "error": "Invalid sort field"
}
```

```json
{
  "error": "Failed to fetch tasks"
}
```

## GET /api/tasks/:id

Fetch a single task by ID.

### Example

GET /api/tasks/5

### Response (200)

```json
{
  "id": 5,
  "title": "Learn Express",
  "course": "Backend",
  "status": "planned"
}
```

### Error Responses

```json
{
  "error": "Invalid task ID"
}
```

```json
{
  "error": "Task not found"
}
```

```json
{
  "error": "Failed to fetch task"
}
```

## POST /api/tasks

Create a new task.

### Request Body

```json
{
  "title": "Learn Node",
  "course": "Backend",
  "status": "ongoing"
}
```

### Validation Rules

• Title must be a string
• Course must be a string
• Status must be a string
• Fields cannot be empty
• Title max length: 200 characters
• Course max length: 100 characters
• Status max length: 50 characters

### Response (201)

```json
{
  "id": 1,
  "title": "Learn Node",
  "course": "Backend",
  "status": "ongoing"
}
```

### Error Responses

```json
{
  "error": "Title must be a string"
}
```

```json
{
  "error": "Course must be a string"
}
```

```json
{
  "error": "Status must be a string"
}
```

```json
{
  "error": "Title cannot be empty"
}
```

```json
{
  "error": "Course cannot be empty"
}
```

```json
{
  "error": "Status cannot be empty"
}
```

```json
{
  "error": "Title is too long. Max 200 characters allowed."
}
```

```json
{
  "error": "Course is too long. Max 100 characters allowed."
}
```

```json
{
  "error": "Status is too long. Max 50 characters allowed."
}
```

```json
{
  "error": "Failed to create task"
}
```

---

## PUT /api/tasks/:id

Update an existing task.

### Example

PUT /api/tasks/5

### Request Body

```json
{
  "title": "Updated task",
  "course": "Backend",
  "status": "done"
}
```

### Response (200)

```json
{
  "id": 5,
  "title": "Updated task",
  "course": "Backend",
  "status": "done"
}
```

### Error Responses

```json
{
  "error": "Title must be a string"
}
```

```json
{
  "error": "Course must be a string"
}
```

```json
{
  "error": "Status must be a string"
}
```

```json
{
  "error": "Title cannot be empty"
}
```

```json
{
  "error": "Course cannot be empty"
}
```

```json
{
  "error": "Status cannot be empty"
}
```

```json
{
  "error": "Task not found"
}
```

```json
{
  "error": "Failed to update task"
}
```

---

## DELETE /api/tasks/:id

Delete a task

### Example

DELETE /api/tasks/5

Response (200)

```json
{
  "message": "Task deleted successfully"
}
```

### Error Responses

```json
{
  "error": "Task not found"
}
```

```json
{
  "error": "Failed to delete task"
}
```

---

## 🤖 AI Endpoint

## POST /api/ai

### Validate and process a prompt.

### Request Body

```json
{
  "prompt": "Give me study tips"
}
```

## Validation Rules

• Must be a string
• Cannot be empty
• Max length: 200 characters
• Cannot contain restricted words:
• hack
• password
• bypass

### Response (200)

```json
{
  "message": "AI route is working",
  "promptReceived": "Give me study tips"
}
```

### Error Responses

```json
{
  "error": "Prompt is required and must be a string"
}
```

```json
{
  "error": "Prompt cannot be empty"
}
```

```json
{
  "error": "Prompt is too long. Max 200 characters allowed."
}
```

```json
{
  "error": "Prompt contains restricted content"
}
```
