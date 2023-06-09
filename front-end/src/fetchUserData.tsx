import axios from "axios";

export const getUserData = async (url: string) => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
