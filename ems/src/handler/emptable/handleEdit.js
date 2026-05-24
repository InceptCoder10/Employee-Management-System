const handleEdit = async (
  id,
  updatedData
) => {
  try {
    await employeeService.updateEmployee(
      id,
      updatedData
    );

    alert("Employee updated successfully");

    // Optional:
    // refetch employees
  } catch (error) {
    alert("Failed to update employee");
  }
};

export default handleEdit;