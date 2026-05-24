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
    type: String,
    default: "Unassigned"
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

// Update the updatedAt field on findByIdAndUpdate
employeeSchema.pre('findByIdAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Employee', employeeSchema);