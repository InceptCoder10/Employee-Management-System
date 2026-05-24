const handleCreate = async (
  employeeData
) => {
  try {
    const newEmployee =
      await employeeService.createEmployee(
        employeeData
      );

    alert("Employee created");

    setEmployees((prev) => [
      ...prev,
      newEmployee.data,
    ]);
  } catch (error) {
    alert("Failed to create employee");
  }
};

export default handleCreate;