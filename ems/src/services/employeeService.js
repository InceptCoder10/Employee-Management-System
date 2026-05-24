import axios from "axios";

const API_BASE_URL =
  "http://localhost:3000/api/employees";

export const employeeService = {
  // ========================================
  // GET ALL EMPLOYEES
  // ========================================
  getAllEmployees: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data.data;
  },

  // ========================================
  // GET SINGLE EMPLOYEE
  // ========================================
  getEmployeeById: async (id) => {
    const response = await axios.get(
      `${API_BASE_URL}/${id}`
    );

    return response.data.data;
  },

  // ========================================
  // CREATE EMPLOYEE
  // ========================================
  createEmployee: async (employeeData) => {
    const response = await axios.post(
      API_BASE_URL,
      employeeData
    );

    return response.data.data;
  },

  // ========================================
  // UPDATE EMPLOYEE
  // ========================================
  updateEmployee: async (
    id,
    updatedData
  ) => {
    const response = await axios.put(
      `${API_BASE_URL}/${id}`,
      updatedData
    );

    return response.data.data;
  },

  // ========================================
  // DELETE EMPLOYEE
  // ========================================
  deleteEmployee: async (id) => {
    const response = await axios.delete(
      `${API_BASE_URL}/${id}`
    );

    return response.data.data;
  },
};