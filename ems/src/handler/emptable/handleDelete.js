const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) return;

  // optimistic UI
  setEmployees((prev) =>
    prev.filter((emp) => emp.id !== id)
  );

  try {
    await employeeService.deleteEmployee(id);

    alert("Employee deleted successfully");
  } catch (error) {
    console.error(error);

    alert("Failed to delete employee");

    // rollback if API fails
    const refreshed =
      await employeeService.getAllEmployees();

    setEmployees(refreshed);
  }
};

export default handleDelete;