import React from "react";
import { Filter } from "lucide-react";

const FilterBar = ({
  selectedStatus,
  onStatusChange,
  selectedDepartment,
  onDepartmentChange,
  departments = [],
  onChange
}) => {
  return (
    <div className="relative max-w-md mb-4">
    
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
        <Filter size={18} />
      </div>

      <div className="flex gap-3 pl-12 pr-4 py-2 border border-gray-300 rounded-lg bg-white">
        <select
          value={selectedStatus}
          onChange={onStatusChange}
          className="flex-1 bg-transparent text-sm text-zinc-800 outline-none cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </select>

        <div className="w-px bg-gray-300" />

        <select
          value={selectedDepartment}
          onChange={onDepartmentChange}
          className="flex-1 bg-transparent text-sm text-zinc-800 outline-none cursor-pointer"
        >
          <option value="All">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept.department_name}>
              {dept.department_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;