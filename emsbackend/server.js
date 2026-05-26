const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Import models
const Employee = require('./models/Employee');
const Department = require('./models/Department');

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

// ============= DEPARTMENT ENDPOINTS =============

// GET all departments
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: departments,
      count: departments.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching departments",
      error: error.message
    });
  }
});

// GET department by ID
app.get('/api/departments/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }
    
    res.json({
      success: true,
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching department",
      error: error.message
    });
  }
});

// POST - Create new department
app.post('/api/departments', async (req, res) => {
  try {
    const { department_name, department_description, department_head, budget } = req.body;
    
    // Validation
    if (!department_name) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: department_name"
      });
    }
    
    // Check if department already exists
    const existingDept = await Department.findOne({ department_name });
    if (existingDept) {
      return res.status(400).json({
        success: false,
        message: "Department already exists"
      });
    }
    
    const newDepartment = new Department({
      department_name,
      department_description: department_description || "",
      department_head: department_head || "",
      budget: budget || "0"
    });
    
    const savedDepartment = await newDepartment.save();
    
    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: savedDepartment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating department",
      error: error.message
    });
  }
});

// PUT - Update department
app.put('/api/departments/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }
    
    // Update fields
    if (req.body.department_name) {
      // Check if new name already exists
      const existingDept = await Department.findOne({ 
        department_name: req.body.department_name,
        _id: { $ne: req.params.id }
      });
      if (existingDept) {
        return res.status(400).json({
          success: false,
          message: "Department name already exists"
        });
      }
      department.department_name = req.body.department_name;
    }
    if (req.body.department_description !== undefined) department.department_description = req.body.department_description;
    if (req.body.department_head) department.department_head = req.body.department_head;
    if (req.body.budget) department.budget = req.body.budget;
    
    const updatedDepartment = await department.save();
    
    res.json({
      success: true,
      message: "Department updated successfully",
      data: updatedDepartment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating department",
      error: error.message
    });
  }
});

// DELETE - Remove department (only if no employees)
app.delete('/api/departments/:id', async (req, res) => {
  try {
    // Check if any employees belong to this department
    const employeeCount = await Employee.countDocuments({ department: req.params.id });
    
    if (employeeCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete department. ${employeeCount} employee(s) belong to this department.`
      });
    }
    
    const department = await Department.findByIdAndDelete(req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }
    
    res.json({
      success: true,
      message: "Department deleted successfully",
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting department",
      error: error.message
    });
  }
});

// ============= EMPLOYEE ENDPOINTS =============

// GET all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find().populate('department').sort({ createdAt: -1 });
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
    const employee = await Employee.findById(req.params.id).populate('department');
    
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
    if (!employee_name || !employee_age || !employee_salary || !department) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: employee_name, employee_age, employee_salary, department"
      });
    }
    
    // Check if department exists
    const deptExists = await Department.findById(department);
    if (!deptExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID. Department does not exist."
      });
    }
    
    const newEmployee = new Employee({
      employee_name,
      employee_age: String(employee_age),
      employee_salary: String(employee_salary),
      profile_image: profile_image || "",
      status: status || "Active",
      department,
      role: role || "Employee",
      experience: String(experience) || "0"
    });
    
    const savedEmployee = await newEmployee.save();
    await savedEmployee.populate('department');
    
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
    
    // If changing department, verify it exists
    if (req.body.department) {
      const deptExists = await Department.findById(req.body.department);
      if (!deptExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid department ID. Department does not exist."
        });
      }
      employee.department = req.body.department;
    }
    
    // Update fields
    if (req.body.employee_name) employee.employee_name = req.body.employee_name;
    if (req.body.employee_age) employee.employee_age = String(req.body.employee_age);
    if (req.body.employee_salary) employee.employee_salary = String(req.body.employee_salary);
    if (req.body.profile_image !== undefined) employee.profile_image = req.body.profile_image;
    if (req.body.status) employee.status = req.body.status;
    if (req.body.role) employee.role = req.body.role;
    if (req.body.experience) employee.experience = String(req.body.experience);
    
    const updatedEmployee = await employee.save();
    await updatedEmployee.populate('department');
    
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
  console.log(`\n📚 Department Endpoints:`);
  console.log(`GET    /api/departments - Get all departments`);
  console.log(`GET    /api/departments/:id - Get department by ID`);
  console.log(`POST   /api/departments - Create new department`);
  console.log(`PUT    /api/departments/:id - Update department`);
  console.log(`DELETE /api/departments/:id - Delete department (if no employees)`);
  console.log(`\n📚 Employee Endpoints:`);
  console.log(`GET    /api/employees - Get all employees`);
  console.log(`GET    /api/employees/:id - Get employee by ID`);
  console.log(`POST   /api/employees - Create new employee`);
  console.log(`PUT    /api/employees/:id - Update employee`);
  console.log(`DELETE /api/employees/:id - Delete employee`);
  console.log(`GET    /health - Health check\n`);
});