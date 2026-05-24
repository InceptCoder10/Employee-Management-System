import React from "react";

import Badge from "../ui/Badge";
import { ExperienceBar } from "../ui/ExperienceBar";
import deptIcons from "../../utils/deptIcons";
import DepartmentBadge from "../ui/DepartmentBadge";
import Button from "../ui/Button";

import { Eye, Pencil, Trash2 } from "lucide-react";

const EmployeeRow = ({ emp, onView, onEdit, onDelete }) => {
  const Icon = deptIcons[emp.department?.toLowerCase()];

  return (
    <tr className="border-b border-gray-100 hover:bg-zinc-50 transition">
      <td className="p-4 text-zinc-600 text-sm font-mono">
        EMP-{emp._id.slice(-4).toUpperCase()}
        </td>
      <td className="p-4 font-medium text-zinc-900 text-sm">{emp.employee_name}</td>
      <td className="p-4 text-zinc-600 text-sm">{emp.employee_age}</td>
      <td className="p-4 text-zinc-600 text-sm">{emp.role}</td>
      
      {/* Department badge style preserved */}
      <td className="p-4">
        <DepartmentBadge department={emp.department} />
      </td>

      <td className="py-4">
        <Badge status={emp.status} text={emp.status} />
      </td>

      <td className="p-4 text-zinc-700 text-sm">
        ₹{Number(emp.employee_salary).toLocaleString("en-IN")}
      </td>
      
      <td className="p-4 min-w-38">
        <ExperienceBar years={emp.experience} />
      </td>
      <td className="p-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="text-xs"
          onClick={() => onView(emp)}>
            <Eye size={14}/>View</Button>
          <Button variant="secondary"
          className="text-xs"
          onClick={() => onEdit(emp)}>
            <Pencil size={14}/>Edit</Button>
          <Button variant="danger"
          className="text-xs"
          onClick={() => onDelete(emp._id)}>
            <Trash2 size={14}/>Delete</Button>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeRow;