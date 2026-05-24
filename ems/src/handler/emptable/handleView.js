const handleView = async (id) => {
  try {
    const employee =
      await employeeService.getEmployeeById(id);

    alert(
      `Viewing Details for:
${employee.employee_name}

Role: ${employee.role}

Salary: ₹${employee.employee_salary}`
    );
  } catch (error) {
    alert("Failed to fetch employee");
  }
};

export default handleView;