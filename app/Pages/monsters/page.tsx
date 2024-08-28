"use client";
import Card from "@/app/components/Card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GenerateRandomMonster from "@/app/components/GenerateRandomMonster";
import { userMonsterType } from "@/app/components/BattlePit/MonsterSelection";
import { useAppContext } from "@/app/context/AppContext";

export type statsType = {
  attack: Number;
  defense: Number;
  speed: Number;
  health: Number;
};

export type monsterType = {
  _id: string;
  name: string;
  img: string;
  type: string;
  abilities: string[];
  stats: statsType;
  description: string;
  evolution: string;
};

function page() {
  const [lockedMonsters, setLockedMonsters] = useState<monsterType[]>([]);
  const { monsters, setMonsters } = useAppContext();

  async function getAllMonsters() {
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
      setMonsters(userMonsters);

      const allMonstersResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllMonsters`,
        { withCredentials: true }
      );

      // setAllMonsters(allMonstersResponse.data.monsters);

      let locked = allMonstersResponse.data.monsters.filter(
        (monster: monsterType) => {
          // Check if this monster's ID exists in the monsters array
          const isLocked = !fetchedUserMonsters.data.monsters?.some(
            (userMonster: userMonsterType) =>
              userMonster.monster._id === monster._id
          );

          return isLocked;
        }
      );

      setLockedMonsters(locked);
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

  useEffect(() => {
    getAllMonsters();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center py-10 w-full z-10">
        <div className="bg-black bg-opacity-50 p-5 flex flex-col items-center w-full">
          <div className="bg-black bg-opacity-70 p-5 min-h-[50vh]">
            <div className="h-full w-full">
              <h1 className="text-xl text-center font-bold my-3">
                Your Monsters
              </h1>
              <div className="grid grid-cols-4">
                {monsters?.map((userMonster) => {
                  return <Card monster={userMonster.monster} />;
                })}
              </div>
            </div>
            <div>
              <h1 className="text-xl text-center font-bold my-3">
                Locked Monsters
              </h1>
              <div className="grid grid-cols-4 gap-5">
                {lockedMonsters?.map((monster: monsterType, idx) => {
                  return <Card monster={monster} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
