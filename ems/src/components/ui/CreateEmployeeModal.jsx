import React, { useState } from "react";
import { X } from "lucide-react";

const CreateEmployeeModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_age: "",
    employee_salary: "",
    role: "",
    department: "",
    status: "Active",
    experience: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-semibold text-zinc-900">Add New Employee</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="create-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Full Name *</label>
              <input type="text" name="employee_name" value={formData.employee_name} onChange={handleChange} required
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="e.g. Jane Doe" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Role</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} required
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none" 
                  placeholder="e.g. Developer" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Department</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} required
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none" 
                  placeholder="e.g. Engineering" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Salary (₹) *</label>
                <input type="number" name="employee_salary" value={formData.employee_salary} onChange={handleChange} required
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none" 
                  placeholder="60000" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange}
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Age *</label>
                <input type="number" name="employee_age" value={formData.employee_age} onChange={handleChange} required
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none" 
                  placeholder="25" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Experience (Yrs)</label>
                <input type="number" name="experience" value={formData.experience} onChange={handleChange} required
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none" 
                  placeholder="3" />
              </div>
            </div>
          </form>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button type="submit" form="create-form"
            className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition shadow-sm">
            Create Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeModal;