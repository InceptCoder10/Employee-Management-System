import React from "react";
import { X } from "lucide-react";
import Badge from "./Badge";
import DepartmentBadge from "./DepartmentBadge";

const ViewEmployeeModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-zinc-900">Employee Details</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 transition">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Name</p>
              <p className="text-sm font-medium text-zinc-900">{employee.employee_name}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Employee ID</p>
              <p className="text-sm font-mono text-zinc-700">
                EMP-{employee._id?.slice(-4).toUpperCase()}
              </p>
            </div>
            
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Role</p>
              <p className="text-sm text-zinc-800">{employee.role}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Department</p>
              <DepartmentBadge department={employee.department} />
            </div>

            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Status</p>
              <Badge status={employee.status} text={employee.status} />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Salary</p>
              <p className="text-sm text-zinc-800">
                ₹{Number(employee.employee_salary).toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Age</p>
              <p className="text-sm text-zinc-800">{employee.employee_age} Years</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Experience</p>
              <p className="text-sm text-zinc-800">{employee.experience} Years</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeModal;