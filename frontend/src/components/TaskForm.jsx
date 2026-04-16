function TaskForm({
  title,
  course,
  status,
  setTitle,
  setCourse,
  setStatus,
  handleSubmit,
  editingId,
  resetForm,
}) {
  function handleGenerateAI() {
    fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "ge mig en studieuppgift",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("AI svar:", data);
      })
      .catch((err) => {
        console.error("AI error:", err);
      });
  }
  return (
    <>
      <h2>{editingId ? "Edit task" : "Add a new task"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="course">Course</label>
          <br />
          <input
            id="course"
            type="text"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <br />
          <input
            id="status"
            type="text"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
        </div>

        <br />

        <button type="submit">{editingId ? "Save changes" : "Add task"}</button>

        <button type="button" onClick={handleGenerateAI}>
          Generate with AI
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>
    </>
  );
}

export default TaskForm;
