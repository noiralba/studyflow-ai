require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const validatePrompt = require("./utils/validatePrompt");
const validateTask = require("./utils/validateTask");

const app = express();
const PORT = process.env.PORT || 5001;

const db = new sqlite3.Database("./database/studyflow.db", (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    course TEXT,
    status TEXT
  )
`);

app.use(cors());
app.use(express.json());

// TASKS

// Hämta EN task
app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/tasks", (req, res) => {
  const { course, status, limit, offset, sort } = req.query;

  let sql = "SELECT * FROM tasks";
  let conditions = [];
  let params = [];

  // Filtrering
  if (course) {
    conditions.push("course = ?");
    params.push(course);
  }

  if (status) {
    conditions.push("status = ?");
    params.push(status);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  // Sortering
  if (sort) {
    const allowedSortFields = ["title", "course", "status"];

    if (!allowedSortFields.includes(sort)) {
      return res.status(400).json({
        error: "Invalid sort field",
      });
    }

    sql += ` ORDER BY ${sort}`;
  }

  // Pagination
  if (limit) {
    sql += " LIMIT ?";
    params.push(Number(limit));
  }

  if (offset) {
    sql += " OFFSET ?";
    params.push(Number(offset));
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error("Failed to fetch tasks:", err.message);
      return res.status(500).json({ error: "Failed to fetch tasks" });
    }

    res.json(rows);
  });
});

// Skapa
app.post("/api/ai", (req, res) => {
  const { prompt } = req.body;

  const result = validatePrompt(prompt);

  if (result.error) {
    return res.status(400).json({
      error: result.error,
    });
  }

  res.json({
    message: "AI route is working",
    promptReceived: result.cleanPrompt,
  });
});

app.post("/api/tasks", (req, res) => {
  const result = validateTask(req.body);

  if (result.error) {
    return res.status(400).json({
      error: result.error,
    });
  }

  const { title, course, status } = result.cleanTask;

  const sql = `
    INSERT INTO tasks (title, course, status)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [title, course, status], function (err) {
    if (err) {
      console.error("Failed to create task:", err.message);
      return res.status(500).json({ error: "Failed to create task" });
    }

    res.status(201).json({
      id: this.lastID,
      title,
      course,
      status,
    });
  });
});

// Uppdatera
app.put("/api/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  const result = validateTask(req.body);

  if (result.error) {
    return res.status(400).json({
      error: result.error,
    });
  }

  const { title, course, status } = result.cleanTask;

  const sql = `
    UPDATE tasks
    SET title = ?, course = ?, status = ?
    WHERE id = ?
  `;

  db.run(sql, [title, course, status, taskId], function (err) {
    if (err) {
      console.error("Failed to update task:", err.message);
      return res.status(500).json({ error: "Failed to update task" });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json({
      id: taskId,
      title,
      course,
      status,
    });
  });
});

// /:ID
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, course, status } = req.body;

  const sql = `
    UPDATE tasks
    SET title = ?, course = ?, status = ?
    WHERE id = ?
  `;

  db.run(sql, [title, course, status, id], function (err) {
    if (err) {
      console.error("Failed to update task:", err.message);
      return res.status(500).json({ error: "Failed to update task" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({
      id: Number(id),
      title,
      course,
      status,
    });
  });
});

app.get("/api/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  // Validera ID
  if (!Number.isInteger(Number(taskId))) {
    return res.status(400).json({
      error: "Invalid task ID",
    });
  }

  const sql = "SELECT * FROM tasks WHERE id = ?";

  db.get(sql, [taskId], (err, row) => {
    if (err) {
      console.error("Failed to fetch task:", err.message);
      return res.status(500).json({ error: "Failed to fetch task" });
    }

    if (!row) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json(row);
  });
});

// Ta bort
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM tasks WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Failed to delete task:", err.message);
      return res.status(500).json({ error: "Failed to delete task" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
