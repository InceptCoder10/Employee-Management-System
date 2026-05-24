import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const employeeService = {
  /**
   * Fetches all employees from the backend
   */
  getAllEmployees: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      
      // Keeping your exact data extraction logic
      return response.data.data || []; 
    } catch (error) {
      console.error("Error fetching employees in employeeService:", error);
      
      // Safe fallback so your component states don't break
      return []; 
    }
  },

  /* 
    You are now perfectly set up to add more endpoints here later:
    
    createEmployee: async (data) => { ... },
    deleteEmployee: async (id) => { ... }
  */
};