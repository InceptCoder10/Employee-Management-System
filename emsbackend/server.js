const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample employee data in the format you specified
const employees = [
  {
    id: 1,
    employee_name: "Tiger Nixon",
    employee_age: "61",
    employee_salary: "320800",
    profile_image: "",
    status: "On Leave",
    department: "Engineering",
    role: "Senior Developer",
    experience: "15"
  },
  {
    id: 2,
    employee_name: "Garrett Winters",
    employee_age: "63",
    employee_salary: "170750",
    profile_image: "",
    status: "Active",
    department: "Sales",
    role: "Sales Manager",
    experience: "20"
  },
  {
    id: 3,
    employee_name: "Ashton Cox",
    employee_age: "66",
    employee_salary: "86000",
    profile_image: "",
    status: "Active",
    department: "HR",
    role: "HR Specialist",
    experience: "18"
  },
  {
    id: 4,
    employee_name: "Cedric Kelly",
    employee_age: "22",
    employee_salary: "433060",
    profile_image: "",
    status: "On Leave",
    department: "Marketing",
    role: "Marketing Executive",
    experience: "2"
  },
  {
    id: 5,
    employee_name: "Airi Satou",
    employee_age: "33",
    employee_salary: "162700",
    profile_image: "",
    status: "Active",
    department: "Engineering",
    role: "Full Stack Developer",
    experience: "8"
  }
];

// GET all employees
app.get('/api/employees', (req, res) => {
  res.json({
    success: true,
    data: employees,
    count: employees.length
  });
});

// GET employee by ID
app.get('/api/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found"
    });
  }
  
  res.json({
    success: true,
    data: employee
  });
});

// POST - Create new employee
app.post('/api/employees', (req, res) => {
  const { employee_name, employee_age, employee_salary, profile_image, status, department, role, experience } = req.body;
  
  // Validation
  if (!employee_name || !employee_age || !employee_salary) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: employee_name, employee_age, employee_salary"
    });
  }
  
  const newEmployee = {
    id: Math.max(...employees.map(e => e.id)) + 1,
    employee_name,
    employee_age: String(employee_age),
    employee_salary: String(employee_salary),
    profile_image: profile_image || "",
    status: status || "Active",
    department: department || "Unassigned",
    role: role || "Employee",
    experience: String(experience) || "0"
  };
  
  employees.push(newEmployee);
  
  res.status(201).json({
    success: true,
    message: "Employee created successfully",
    data: newEmployee
  });
});

// PUT - Update employee
app.put('/api/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found"
    });
  }
  
  // Update fields
  if (req.body.employee_name) employee.employee_name = req.body.employee_name;
  if (req.body.employee_age) employee.employee_age = String(req.body.employee_age);
  if (req.body.employee_salary) employee.employee_salary = String(req.body.employee_salary);
  if (req.body.profile_image !== undefined) employee.profile_image = req.body.profile_image;
  if (req.body.status) employee.status = req.body.status;
  if (req.body.department) employee.department = req.body.department;
  if (req.body.role) employee.role = req.body.role;
  if (req.body.experience) employee.experience = String(req.body.experience);
  
  res.json({
    success: true,
    message: "Employee updated successfully",
    data: employee
  });
});

// DELETE - Remove employee
app.delete('/api/employees/:id', (req, res) => {
  const index = employees.findIndex(emp => emp.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Employee not found"
    });
  }
  
  const deletedEmployee = employees.splice(index, 1);
  
  res.json({
    success: true,
    message: "Employee deleted successfully",
    data: deletedEmployee[0]
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: "API is running" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Employee API running on http://localhost:${PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`GET    /api/employees - Get all employees`);
  console.log(`GET    /api/employees/:id - Get employee by ID`);
  console.log(`POST   /api/employees - Create new employee`);
  console.log(`PUT    /api/employees/:id - Update employee`);
  console.log(`DELETE /api/employees/:id - Delete employee`);
  console.log(`GET    /health - Health check`);
});