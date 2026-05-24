import axios from "axios";

export const EmployeeAPI = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/employees"
    );

    // console.log(response.data);

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching employees:",
      error
    );

    return [];
  }
};