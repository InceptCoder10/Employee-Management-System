import React, { useEffect, useState } from "react";
// import { EmployeeAPI } from "../../api/EmployeeAPI";
import { employeeService } from "../../services/employeeService";
import Loader from "../ui/Loader";
import Badge from "../ui/Badge";
import { ExperienceBar } from "../ui/ExperienceBar";
import deptIcons  from "../../utils/deptIcons";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeeData = await employeeService.getAllEmployees();
      setEmployees(employeeData);
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  if (loading) return <p><Loader/></p>;

  if (employees.length === 0) return <p>No employees found</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
      <table className="w-full">
        <thead>
            <tr className="bg-gray-50">
              {[
                "ID",
                "Employee",
                "Age",
                "Role",
                "Department",
                "Status",
                "Salary",
                "Experience",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[11px] font-medium text-zinc-600 uppercase tracking-widest whitespace-nowrap border-t border-b border-gray-200"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

        <tbody>
          {employees.map((emp) => (
            
            <tr
              key={emp.id}
              className="
              border-b
              border-gray-100
              hover:bg-zinc-50
              transition
            "
            >
              <td className="p-4">{emp.id}</td>

              <td className="p-4 font-medium">{emp.employee_name}</td>

              <td className="p-4">{emp.employee_age}</td>

              <td className="p-4">{emp.role}</td>

              <td className="p-4">

                    <span className="flex items-center gap-2 border border-zinc-300 px-3 py-2 rounded-full justify-center text-xs bg-zinc-50 min-w-30 w-fit text-gray-800 h-full">
                    {(() => {
                        const Icon = deptIcons[emp.department?.toLowerCase()];
                        return Icon ? <Icon size={14} /> : null;
                      })()}
                    {emp.department}
                      </span>
            
              </td>

              <td className="py-4">
                <Badge status={emp.status} text={emp.status}/>
              </td>

              <td className="p-4">
                ₹{Number(emp.employee_salary).toLocaleString('en-IN')}
              </td>

              {/* <td className="p-4">{emp.department}</td> */}              
              <td className="p-4 min-w-38">
                <ExperienceBar years={emp.experience} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;