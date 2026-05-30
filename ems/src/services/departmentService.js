import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/departments";

export const departmentService = {
  createDepartment: async (departmentData) => {
    const response = await axios.post(API_BASE_URL, departmentData);
    return response.data;
  },

  getAllDepartments: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data.data;
  },
  // You can add getAll, getById, update, and delete here later!
};