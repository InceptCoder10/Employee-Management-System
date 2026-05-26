const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employee_name: {
    type: String,
    required: true
  },
  employee_age: {
    type: String,
    required: true
  },
  employee_salary: {
    type: String,
    required: true
  },
  profile_image: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "On Leave", "Inactive"]
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  role: {
    type: String,
    default: "Employee"
  },
  experience: {
    type: String,
    default: "0"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
employeeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Populate department details when querying employees
employeeSchema.pre(/^find/, function(next) {
  this.populate('department');
  next();
});

module.exports = mongoose.model('Employee', employeeSchema);