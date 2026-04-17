require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const validatePrompt = require("./utils/validatePrompt");

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

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/tasks", (req, res) => {
  const sql = "SELECT * FROM tasks";

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Failed to fetch tasks:", err.message);
      return res.status(500).json({ error: "Failed to fetch tasks" });
    }

    res.json(rows);
  });
});

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
  const { title, course, status } = req.body;

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
