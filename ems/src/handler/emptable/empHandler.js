import { employeeService } from "../../services/employeeService";

// ========================================
// VIEW HANDLER
// ========================================
export const handleView = (emp) => {
  // Usually, you'd open a modal here. For now, let's alert the details.
  alert(`
    Employee Details:
    Name: ${emp.employee_name}
    Role: ${emp.role}
    Dept: ${emp.department}
    Salary: ₹${emp.employee_salary}
  `);
};

// ========================================
// EDIT HANDLER
// ========================================
export const handleEdit = async (emp, refreshData) => {
  const newName = prompt("Enter new name:", emp.employee_name);
  
  if (newName && newName !== emp.employee_name) {
    try {
      // Note: MongoDB uses _id. If your API returns 'id', ensure consistency.
      const id = emp._id || emp.id; 
      await employeeService.updateEmployee(id, { ...emp, employee_name: newName });
      
      alert("Update successful!");
      if (refreshData) refreshData(); // Call the fetch function from the component
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update employee.");
    }
  }
};
// ========================================
// SUBMIT HANDLER
// ========================================
export const submitEdit = async (id, updatedData, refreshData, closeModal) => {
  try {
    await employeeService.updateEmployee(id, updatedData);
    refreshData(); // Refresh the table data
    closeModal();  // Close the popup
  } catch (error) {
    console.error("Update failed:", error);
    alert("Failed to update employee details.");
  }
};

// ========================================
// DELETE HANDLER
// ========================================
export const handleDelete = async (id, setEmployees) => {
  // Keeping standard confirm for delete, though you could build a 3rd modal for this!
  if (window.confirm("Are you sure you want to delete this record?")) {
    try {
      await employeeService.deleteEmployee(id);
      setEmployees((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Could not delete from database.");
    }
  }
};