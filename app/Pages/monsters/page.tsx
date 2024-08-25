"use client";
import Card from "@/app/components/Card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GenerateRandomMonster from "@/app/components/GenerateRandomMonster";

type statsType = {
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
  const [monsters, setMonsters] = useState<monsterType[] | null>(null);
  const [lockedMonsters, setLockedMonsters] = useState<monsterType[]>([]);
  const [allMonsters, setAllMonsters] = useState<monsterType[]>([]);
  const [showGenerateComponent, setShowGenerateComponent] =
    useState<boolean>(false);

  async function getAllMonsters() {
    try {
      const userMonstersResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUserMonsters`,
        { withCredentials: true }
      );

      setMonsters(userMonstersResponse.data.monsters);

      const allMonstersResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllMonsters`,
        { withCredentials: true }
      );

      setAllMonsters(allMonstersResponse.data.monsters);

      let locked = allMonstersResponse.data.monsters.filter(
        (monster: monsterType) => {
          // Check if this monster's ID exists in the monsters array
          const isLocked = !userMonstersResponse.data.monsters?.some(
            (userMonst: monsterType) => userMonst._id === monster._id
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

  useEffect(() => {
    if (monsters?.length === 0) {
      setShowGenerateComponent(true);
    }
  }, [allMonsters, monsters]);

  return (
    <>
      <div className="flex justify-center items-center py-10 w-full">
        {showGenerateComponent && <GenerateRandomMonster />}

        <div className="bg-black bg-opacity-50 p-5 flex flex-col items-center w-full">
          <div className="bg-black bg-opacity-70 p-5">
            <div className="h-full w-full">
              <h1 className="text-xl text-center font-bold my-3">
                Your Monsters
              </h1>
              <div className="grid grid-cols-4">
                {monsters?.map((monster: monsterType, idx) => {
                  return <Card monster={monster} />;
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
