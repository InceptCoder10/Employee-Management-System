const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Import Employee model
const Employee = require('./models/Employee');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/employee_db';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// GET all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: employees,
      count: employees.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching employees",
      error: error.message
    });
  }
});

// GET employee by ID
app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching employee",
      error: error.message
    });
  }
});

// POST - Create new employee
app.post('/api/employees', async (req, res) => {
  try {
    const { employee_name, employee_age, employee_salary, profile_image, status, department, role, experience } = req.body;
    
    // Validation
    if (!employee_name || !employee_age || !employee_salary) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: employee_name, employee_age, employee_salary"
      });
    }
    
    const newEmployee = new Employee({
      employee_name,
      employee_age: String(employee_age),
      employee_salary: String(employee_salary),
      profile_image: profile_image || "",
      status: status || "Active",
      department: department || "Unassigned",
      role: role || "Employee",
      experience: String(experience) || "0"
    });
    
    const savedEmployee = await newEmployee.save();
    
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: savedEmployee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating employee",
      error: error.message
    });
  }
});

// PUT - Update employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
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
    
    const updatedEmployee = await employee.save();
    
    res.json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating employee",
      error: error.message
    });
  }
});

// DELETE - Remove employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }
    
    res.json({
      success: true,
      message: "Employee deleted successfully",
      data: employee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting employee",
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: "API is running" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Employee API running on http://localhost:${PORT}`);
  console.log(`\n📚 Available endpoints:`);
  console.log(`GET    /api/employees - Get all employees`);
  console.log(`GET    /api/employees/:id - Get employee by ID`);
  console.log(`POST   /api/employees - Create new employee`);
  console.log(`PUT    /api/employees/:id - Update employee`);
  console.log(`DELETE /api/employees/:id - Delete employee`);
  console.log(`GET    /health - Health check\n`);
});