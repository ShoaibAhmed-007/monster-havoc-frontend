import axios from "axios";
import { userMonsterType } from "../components/BattlePit/MonsterSelection";
import { monsterType } from "../Pages/monsters/page";

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

export async function getUserMonsters(
  setMonsters?: React.Dispatch<React.SetStateAction<userMonsterType[] | null>>
) {
  try {
    const fetchedUserMonsters = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUserMonsters`,
      { withCredentials: true }
    );

    const userMonsters: userMonsterType[] =
      fetchedUserMonsters.data.monsters.map((evolObj: any) => {
        const mainMonster = {
          abilities: evolObj.abilities,
          monster: evolObj.monster as monsterType,
          monsterLvl: evolObj.monsterLevel,
        };
        return mainMonster;
      });
    if (setMonsters) {
      setMonsters(userMonsters);
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

export async function getMonsters(
  setAllMonsters: React.Dispatch<React.SetStateAction<monsterType[]>>
) {
  try {
    const allMonstersResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllMonsters`,
      { withCredentials: true }
    );

    if (allMonstersResponse.status === 200) {
      setAllMonsters(allMonstersResponse.data.monsters);
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
