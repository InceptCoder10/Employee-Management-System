import React, { useState } from "react";
import { X } from "lucide-react";

const CreateDepartmentModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    department_name: "",
    department_description: "",
    department_head: "",
    budget: "",
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
          <h2 className="text-lg font-semibold text-zinc-900">Add New Department</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="create-dept-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Department Name *</label>
              <input type="text" name="department_name" value={formData.department_name} onChange={handleChange} required
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="e.g. Engineering" />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Description</label>
              <textarea name="department_description" value={formData.department_description} onChange={handleChange} rows="2"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none resize-none" 
                placeholder="Brief overview of the department..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Department Head</label>
                <input type="text" name="department_head" value={formData.department_head} onChange={handleChange}
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none" 
                  placeholder="e.g. Sarah Smith" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Budget (₹)</label>
                <input type="number" name="budget" value={formData.budget} onChange={handleChange}
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none" 
                  placeholder="500000" />
              </div>
            </div>
          </form>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button type="submit" form="create-dept-form"
            className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition shadow-sm">
            Create Department
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDepartmentModal;