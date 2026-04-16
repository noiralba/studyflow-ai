function TaskList({ tasks, handleEdit, handleDelete }) {
  return (
    <>
      <h2>My tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.course} - {task.status}{" "}
              <button type="button" onClick={() => handleEdit(task)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default TaskList;
