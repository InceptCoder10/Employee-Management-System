const mongoose = require('mongoose');
require('dotenv').config();

const Employee = require('./models/Employee');
const Department = require('./models/Department');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/employee_db';

const departmentData = [
  {
    department_name: "Engineering",
    department_description: "Software development and technical team",
    department_head: "John Smith",
    budget: "500000"
  },
  {
    department_name: "Sales",
    department_description: "Sales and business development",
    department_head: "Sarah Johnson",
    budget: "300000"
  },
  {
    department_name: "HR",
    department_description: "Human Resources and recruitment",
    department_head: "Emily Davis",
    budget: "150000"
  },
  {
    department_name: "Marketing",
    department_description: "Marketing and brand management",
    department_head: "Michael Brown",
    budget: "250000"
  },
  {
    department_name: "Finance",
    department_description: "Financial management and accounting",
    department_head: "Robert Wilson",
    budget: "200000"
  }
];

const employeeData = [
  {
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
    employee_name: "Airi Satou",
    employee_age: "33",
    employee_salary: "162700",
    profile_image: "",
    status: "Active",
    department: "Engineering",
    role: "Full Stack Developer",
    experience: "8"
  },
  {
    employee_name: "Brielle Williamson",
    employee_age: "61",
    employee_salary: "372000",
    profile_image: "",
    status: "Active",
    department: "Finance",
    role: "Finance Manager",
    experience: "12"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Employee.deleteMany({});
    await Department.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert departments
    const insertedDepts = await Department.insertMany(departmentData);
    console.log(`✅ Inserted ${insertedDepts.length} departments`);

    // Create department lookup
    const deptLookup = {};
    insertedDepts.forEach(dept => {
      deptLookup[dept.department_name] = dept._id;
    });

    // Insert employees with department references
    const employeesWithDeptIds = employeeData.map(emp => ({
      ...emp,
      department: deptLookup[emp.department]
    }));

    const insertedEmployees = await Employee.insertMany(employeesWithDeptIds);
    console.log(`✅ Inserted ${insertedEmployees.length} employees`);

    // Display inserted data
    console.log('\n📊 Departments Created:');
    insertedDepts.forEach((dept, index) => {
      console.log(`${index + 1}. ${dept.department_name} (Head: ${dept.department_head}) - ID: ${dept._id}`);
    });

    console.log('\n👥 Employees Created:');
    const populatedEmployees = await Employee.find().populate('department');
    populatedEmployees.forEach((emp, index) => {
      console.log(`${index + 1}. ${emp.employee_name} - ${emp.role} in ${emp.department.department_name} (Salary: ${emp.employee_salary})`);
    });

    console.log('\n✨ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();