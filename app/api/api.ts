import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addUserMonster(monsterId?: string) {
  try {
    const response = await axios.patch(
      `${baseURL}/api/addUserMonster`,
      { monsterId },
      { withCredentials: true }
    );

    if (response.status === 200) {
      console.log(response.data);
    }
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error response:", error.response);
      // Handle specific error codes if needed
      if (error.response.status === 404) {
        console.error("Monsters not found.");
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      } else {
        console.error("An error occurred:", error.response.data.message);
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received:", error.request);
      console.error("Please check your network connection.");
    } else {
      // Something else caused the error
      console.error("Error:", error.message);
    }
  }
}
