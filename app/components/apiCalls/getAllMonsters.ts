import axios from "axios";
import { Monster } from "../Game Features/MonsterDB";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function getAllMonsters() {
  try {
    const response = await axios.get(`${baseURL}/api/getAllMonsters`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data.monsters;
    } else {
      console.log("Error occured!");
    }
  } catch (error) {
    console.log(error);
  }
}
