function validateTask(task) {
  const { title, course, status } = task;

  if (
    typeof title !== "string" ||
    typeof course !== "string" ||
    typeof status !== "string"
  ) {
    return {
      error: "Title, course, and status must all be strings",
      cleanTask: null,
    };
  }

  const cleanTitle = title.trim();
  const cleanCourse = course.trim();
  const cleanStatus = status.trim();

  if (!cleanTitle || !cleanCourse || !cleanStatus) {
    return {
      error: "Title, course, and status cannot be empty",
      cleanTask: null,
    };
  }

  if (cleanTitle.length > 200) {
    return {
      error: "Title is too long. Max 200 characters allowed.",
      cleanTask: null,
    };
  }

  if (cleanCourse.length > 100) {
    return {
      error: "Course is too long. Max 100 characters allowed.",
      cleanTask: null,
    };
  }

  if (cleanStatus.length > 50) {
    return {
      error: "Status is too long. Max 50 characters allowed.",
      cleanTask: null,
    };
  }

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
