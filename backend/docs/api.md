# StudyFlow API Documentation 📡

## Base URL

```
http://localhost:5001
```

---

## 📚 Tasks

### GET /api/tasks

Fetch all tasks.

#### Response

```json
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

Create a new task.

#### Request

```json
{
  "title": "Learn API",
  "course": "Backend",
  "status": "planned"
}
```

#### Response

```json
{
  "id": 2,
  "title": "Learn API",
  "course": "Backend",
  "status": "planned"
}
```

---

### PUT /api/tasks/:id

Update an existing task.

#### Example Request

```json
{
  "title": "Updated task",
  "course": "Backend",
  "status": "done"
}
```

---

### DELETE /api/tasks/:id

Delete a task.

---

## 🤖 AI Endpoint

### POST /api/ai

Basic AI route with input validation.

#### Request

```json
{
  "prompt": "give me a study task"
}
```

---

#### Success Response

```json
{
  "message": "AI route is working",
  "promptReceived": "give me a study task"
}
```

---

#### Error Response (example)

```json
{
  "error": "Prompt cannot be empty"
}
```

---

## 🔍 Validation Rules

The AI endpoint validates input before processing:

- `prompt` must be a string
- empty input is rejected
- input is trimmed
- input length is limited
- certain keywords are blocked
