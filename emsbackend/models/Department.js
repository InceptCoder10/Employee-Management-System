const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  department_description: {
    type: String,
    default: ""
  },
  department_head: {
    type: String,
    default: ""
  },
  budget: {
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
departmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Department', departmentSchema);