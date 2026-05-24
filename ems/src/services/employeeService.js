import axios from "axios";

const API_BASE_URL =
  "http://localhost:3000/api";

export const employeeService = {
  // ========================================
  // GET ALL EMPLOYEES
  // ========================================
  getAllEmployees: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/employees`
      );

      return response.data.data || [];
    } catch (error) {
      console.error(
        "Error fetching employees:",
        error
      );

      return [];
    }
  },

  // ========================================
  // GET SINGLE EMPLOYEE
  // ========================================
  getEmployeeById: async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/employees/${id}`
      );

      return response.data.data;
    } catch (error) {
      console.error(
        `Error fetching employee ${id}:`,
        error
      );

      throw error;
    }
  },

  // ========================================
  // CREATE EMPLOYEE
  // ========================================
  createEmployee: async (employeeData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/employees`,
        employeeData
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error creating employee:",
        error
      );

      throw error;
    }
  },

  // ========================================
  // UPDATE EMPLOYEE
  // ========================================
  updateEmployee: async (
    id,
    updatedData
  ) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/employees/${id}`,
        updatedData
      );

      return response.data;
    } catch (error) {
      console.error(
        `Error updating employee ${id}:`,
        error
      );

      throw error;
    }
  },

  // ========================================
  // DELETE EMPLOYEE
  // ========================================
  deleteEmployee: async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/employees/${id}`
      );

      return response.data;
    } catch (error) {
      console.error(
        `Error deleting employee ${id}:`,
        error
      );

      throw error;
    }
  },
};