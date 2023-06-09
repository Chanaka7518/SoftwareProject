import axios from "axios";

export const getUserData = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5001/api/client/${userId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};