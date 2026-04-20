function validateTask(task) {
  const { title, course, status } = task;

  // TYPKONTROLL
  if (typeof title !== "string") {
    return { error: "Title must be a string", cleanTask: null };
  }

  if (typeof course !== "string") {
    return { error: "Course must be a string", cleanTask: null };
  }

  if (typeof status !== "string") {
    return { error: "Status must be a string", cleanTask: null };
  }

  // Trim
  const cleanTitle = title.trim();
  const cleanCourse = course.trim();
  const cleanStatus = status.trim();

  // Loop-baserad validering
  const fields = [
    { value: cleanTitle, name: "Title", max: 200 },
    { value: cleanCourse, name: "Course", max: 100 },
    { value: cleanStatus, name: "Status", max: 50 },
  ];

  for (const field of fields) {
    if (field.value.length === 0) {
      return {
        error: `${field.name} cannot be empty`,
        cleanTask: null,
      };
    }

    if (field.value.length > field.max) {
      return {
        error: `${field.name} is too long. Max ${field.max} characters allowed.`,
        cleanTask: null,
      };
    }
  }

  // RETURNERA REN DATA
  return {
    error: null,
    cleanTask: {
      title: cleanTitle,
      course: cleanCourse,
      status: cleanStatus,
    },
  };
}

module.exports = validateTask;
