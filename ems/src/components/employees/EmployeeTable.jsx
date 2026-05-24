import React, { useEffect, useMemo, useState } from "react";

import { employeeService } from "../../services/employeeService";

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
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [searchQuery, setsearchQuery] = useState("");
  const [selectedStatus, setselectedStatus] = useState("All");

  const fetchEmployees = async () => {
      const employeeData = await employeeService.getAllEmployees();
      setEmployees(employeeData);
      setLoading(false);
    };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {

    const lowerCaseQuery = searchQuery
      .toLowerCase()
      .trim();

  return employees.filter((emp) => {

    const matchesSearch = 
      !lowerCaseQuery || 
      emp.employee_name
      ?.toLowerCase()
      .includes(lowerCaseQuery) || 
      emp.department
      ?.toLowerCase()
      .includes(lowerCaseQuery);
    
    const matchesStatus = 
      selectedStatus === "All" || 
      emp.status === selectedStatus;
    
    // Both conditions must pass
    return matchesStatus && matchesSearch;
  });
}, [employees, searchQuery, selectedStatus]); // Ensure all 3 are in the dependency array!

  const handleOpenView = (emp) => {
    setActiveEmployee(emp);
    setIsViewOpen(true);
  };

  const handleOpenEdit = (emp) => {
    setActiveEmployee(emp);
    setIsEditOpen(true);
  };

  const handleSaveEdit = (id, formData) => {
    submitEdit(id, formData, fetchEmployees, () => setIsEditOpen(false));
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
      <div className="flex gap-4">
        <SearchInput 
        value={searchQuery} 
        onChange={(e) => 
          setsearchQuery(e.target.value)}
        placeholder="Search by name or department..."/>

      <FilterBar 
      selectedStatus={selectedStatus} 
      onStatusChange={(e) => 
        setselectedStatus(e.target.value)}
      />
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
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