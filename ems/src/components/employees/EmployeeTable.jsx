import React, { useEffect, useMemo, useState } from "react";

import { employeeService } from "../../services/employeeService";
import { departmentService } from "../../services/departmentService";

import Loader from "../ui/Loader";
import SearchInput  from "../ui/SearchInput";
import FilterBar from "../ui/FilterBar";

import EmployeeRow from "./EmployeeRow";

import ViewEmployeeModal from "../ui/ViewEmployeeModal";
import EditEmployeeModal from "../ui/EditEmployeeModal";

import {
  handleView,
  handleEdit,
  handleDelete,
  submitEdit,
} from "../../handler/emptable/empHandler";


const TABLE_HEADERS = [
  "ID",
  "Employee",
  "Age",
  "Role",
  "Department",
  "Status",
  "Salary",
  "Experience",
  "Actions",
];

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [searchQuery, setsearchQuery] = useState("");
  const [selectedStatus, setselectedStatus] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [employeeData, departmentData] = await Promise.all([
        employeeService.getAllEmployees(),
        departmentService.getAllDepartments()
      ])
        setEmployees(employeeData);
        setDepartments(departmentData);
    } catch (error)
      {
        console.error("Error fetching data:",error);
      } finally {
        setLoading(false);
      }
  }

  // const fetchEmployees = async () => {
  //     const employeeData = await employeeService.getAllEmployees();
  //     setEmployees(employeeData);
  //     setLoading(false);
  //   };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredEmployees = useMemo(() => {

    const lowerCaseQuery = searchQuery
      .toLowerCase()
      .trim();

  return employees.filter((emp) => {
    const deptName = typeof emp.department === 'object' 
      ? emp.department?.department_name 
      : emp.department;

    const matchesSearch = 
      !lowerCaseQuery || 
      emp.employee_name
      ?.toLowerCase()
      .includes(lowerCaseQuery) || 
      emp.role
      ?.toLowerCase()
      .includes(lowerCaseQuery);
    
    const matchesStatus = 
      selectedStatus === "All" || 
      emp.status === selectedStatus;

    const matchesDepartment = 
      selectedDepartment === "All" ||
      deptName === selectedDepartment;
    
    // Both conditions must pass
    return matchesStatus && matchesSearch && matchesDepartment;
  });
}, [employees, searchQuery, selectedStatus, selectedDepartment]); // Ensure all 3 are in the dependency array!

  const handleOpenView = (emp) => {
    setActiveEmployee(emp);
    setIsViewOpen(true);
  };

  const handleOpenEdit = (emp) => {
    setActiveEmployee(emp);
    setIsEditOpen(true);
  };

  const handleSaveEdit = (id, formData) => {
    submitEdit(id, formData, fetchData, () => setIsEditOpen(false));
  };

  if (loading) {
    return <Loader/>;
  } 

  if (employees.length === 0) { 
    return <p className="text-center text-gray-500 py-10">
      No employees found</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 md:flex-row flex-col">
        <SearchInput 
        value={searchQuery} 
        onChange={(e) => 
          setsearchQuery(e.target.value)}
        placeholder="Search by name or role..."/>

      <FilterBar
      selectedStatus={selectedStatus} 
      selectedDepartment={selectedDepartment}
      onStatusChange={(e) => 
      {
        setselectedStatus(e.target.value)
      }}
      onDepartmentChange={(e) => {
        setSelectedDepartment(e.target.value)
      }}
      departments={departments}
      />
    </div>

    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 md:p-6 overflow-x-auto">
        {filteredEmployees.length === 0 ? (
        <div className="text-sm text-gray-600 text-center py-8">
          No employees found matching "{searchQuery}"
        </div>
      ) : (
        <table className="w-full">
        <thead>
            <tr className="bg-gray-50">
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-[11px] font-medium text-zinc-600 uppercase tracking-widest whitespace-nowrap border-t border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <EmployeeRow 
                key={emp._id} 
                emp={emp}
                onView={() => handleOpenView(emp)}
                onEdit={() => handleOpenEdit(emp)}
                onDelete={(id) => handleDelete(id, setEmployees)} />
            ))}
          </tbody>
      </table>
      )}
      </div>
      </div>
      {isViewOpen && (
        <ViewEmployeeModal
          employee={activeEmployee}
          onClose={() => setIsViewOpen(false)}
        />
      )}
      {isEditOpen && (
        <EditEmployeeModal
          employee={activeEmployee}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default EmployeeTable;