import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/departments";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || "An error occurred";
    console.error("API Error:", message);
    return Promise.reject(new Error(message));
  }
);

export const departmentService = {
  /**
   * Get all departments
   * @returns {Promise<Array>} Array of department objects
   */
  getAllDepartments: async () => {
    try {
      const response = await apiClient.get("/");
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  },

  /**
   * Get a single department by ID
   * @param {string} id - Department ID
   * @returns {Promise<Object>} Department object
   */
  getDepartmentById: async (id) => {
    try {
      const response = await apiClient.get(`/${id}`);
      return response.data?.data || response.data;
    } catch (error) {
      console.error(`Error fetching department ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new department
   * @param {Object} departmentData - Department data object
   * @param {string} departmentData.department_name - Department name
   * @param {string} departmentData.department_head - Department head name
   * @param {string|number} departmentData.budget - Department budget
   * @param {string} departmentData.department_description - Department description (optional)
   * @returns {Promise<Object>} Created department object
   */
  createDepartment: async (departmentData) => {
    try {
      // Validate required fields
      if (!departmentData.department_name?.trim()) {
        throw new Error("Department name is required");
      }
      if (!departmentData.department_head?.trim()) {
        throw new Error("Department head is required");
      }
      if (!departmentData.budget || Number(departmentData.budget) <= 0) {
        throw new Error("Budget must be greater than 0");
      }

      // Prepare data
      const payload = {
        department_name: departmentData.department_name.trim(),
        department_head: departmentData.department_head.trim(),
        budget: Number(departmentData.budget),
        department_description: departmentData.department_description?.trim() || "",
      };

      const response = await apiClient.post("/", payload);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error creating department:", error);
      throw error;
    }
  },

  /**
   * Update a department
   * @param {string} id - Department ID
   * @param {Object} departmentData - Updated department data
   * @returns {Promise<Object>} Updated department object
   */
  updateDepartment: async (id, departmentData) => {
    try {
      if (!id) {
        throw new Error("Department ID is required");
      }

      const payload = {
        ...(departmentData.department_name && {
          department_name: departmentData.department_name.trim(),
        }),
        ...(departmentData.department_head && {
          department_head: departmentData.department_head.trim(),
        }),
        ...(departmentData.budget && {
          budget: Number(departmentData.budget),
        }),
        ...(departmentData.department_description !== undefined && {
          department_description: departmentData.department_description.trim(),
        }),
      };

      const response = await apiClient.put(`/${id}`, payload);
      return response.data?.data || response.data;
    } catch (error) {
      console.error(`Error updating department ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a department
   * @param {string} id - Department ID
   * @returns {Promise<Object>} Response from server
   */
  deleteDepartment: async (id) => {
    try {
      if (!id) {
        throw new Error("Department ID is required");
      }

      const response = await apiClient.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting department ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete multiple departments
   * @param {Array<string>} ids - Array of department IDs
   * @returns {Promise<Object>} Response from server
   */
  deleteDepartments: async (ids) => {
    try {
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error("At least one department ID is required");
      }

      // Send as bulk delete request
      const response = await apiClient.post("/bulk-delete", { ids });
      return response.data;
    } catch (error) {
      // Fallback: delete one by one if bulk delete is not supported
      console.warn("Bulk delete not supported, deleting individually:", error);
      const results = await Promise.all(
        ids.map((id) => departmentService.deleteDepartment(id))
      );
      return { deleted: results.length, data: results };
    }
  },

  /**
   * Search departments
   * @param {string} searchTerm - Search term
   * @returns {Promise<Array>} Array of matching departments
   */
  searchDepartments: async (searchTerm) => {
    try {
      const response = await apiClient.get("/", {
        params: { search: searchTerm },
      });
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Error searching departments:", error);
      throw error;
    }
  },

  /**
   * Get departments by budget range
   * @param {number} minBudget - Minimum budget
   * @param {number} maxBudget - Maximum budget
   * @returns {Promise<Array>} Array of departments within budget range
   */
  getDepartmentsByBudgetRange: async (minBudget, maxBudget) => {
    try {
      const response = await apiClient.get("/", {
        params: { minBudget, maxBudget },
      });
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Error fetching departments by budget:", error);
      throw error;
    }
  },

  /**
   * Get total budget across all departments
   * @returns {Promise<number>} Total budget
   */
  getTotalBudget: async () => {
    try {
      const departments = await departmentService.getAllDepartments();
      return departments.reduce((sum, dept) => sum + Number(dept.budget || 0), 0);
    } catch (error) {
      console.error("Error calculating total budget:", error);
      throw error;
    }
  },
};

export default departmentService;