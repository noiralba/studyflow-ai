import { useEffect, useState } from "react";
import TaskList from "./components/taskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  function fetchTasks() {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }

  function resetForm() {
    setTitle("");
    setCourse("");
    setStatus("");
    setEditingId(null);
  }

  function handleEdit(task) {
    setTitle(task.title);
    setCourse(task.course);
    setStatus(task.status);
    setEditingId(task.id);
    setMessage(`Editing: ${task.title}`);
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    fetch(`api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }

        setMessage("Task deleted");
        fetchTasks();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const taskData = {
      title,
      course,
      status,
    };

    if (editingId) {
      fetch(`/api/tasks/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessage(`Updated: ${data.title}`);
          resetForm();
          fetchTasks();
        })
        .catch((error) => {
          console.error("Error updating task:", error);
        });
    } else {
      fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessage(`Added: ${data.title}`);
          resetForm();
          fetchTasks();
        })
        .catch((error) => {
          console.error("Error creating task:", error);
        });
    }
  }

  return (
    <main>
      <h1>StudyFlow</h1>
      <p>Frontend Developer fe25-KYH</p>

      <TaskForm
        title={title}
        course={course}
        status={status}
        setTitle={setTitle}
        setCourse={setCourse}
        setStatus={setStatus}
        handleSubmit={handleSubmit}
        editingId={editingId}
        resetForm={resetForm}
      />

      {message && <p>{message}</p>}

      <TaskList
        tasks={tasks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </main>
  );
}

export default App;
