const mongoose = require('mongoose');
require('dotenv').config();

const Employee = require('./models/Employee');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/employee_db';

const seedData = [
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
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Employee.deleteMany({});
    console.log('🗑️  Cleared existing employee data');

    // Insert seed data
    const insertedData = await Employee.insertMany(seedData);
    console.log(`✅ Inserted ${insertedData.length} employees into the database`);

    // Display inserted data
    console.log('\n📊 Inserted Data:');
    insertedData.forEach((emp, index) => {
      console.log(`${index + 1}. ${emp.employee_name} (${emp.department}) - ID: ${emp._id}`);
    });

    console.log('\n✨ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();