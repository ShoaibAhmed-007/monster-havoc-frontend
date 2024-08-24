"use client";
import Card from "@/app/components/Card";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  async function getUserMonsters() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUserMonsters`,
        { withCredentials: true }
      );
      console.log(response.data.monsters);
      setMonsters(response.data.monsters);
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

  async function getAllMonsters() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllMonsters`,
        { withCredentials: true }
      );
      let locked = response.data.monsters.filter((monster: monsterType) => {
        // Check if this monster's ID exists in the monsters array
        const isLocked = !monsters?.some((userMonst: monsterType) => {
          const match = userMonst._id === monster._id;
          console.log(
            `Comparing ${userMonst._id} with ${monster._id}: ${match}`
          );
          return match;
        });

        console.log(`Monster ID: ${monster._id}, isLocked: ${isLocked}`);
        return isLocked;
      });

      console.log(locked);
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
    if (!monsters) {
      getUserMonsters();
      getAllMonsters();
    }
  }, [monsters]);

  return (
    <>
      <div className="flex justify-center items-center py-10">
        <div className="bg-black bg-opacity-50 p-5 flex flex-col items-center">
          <div className="bg-black bg-opacity-70 h-96 w-96">
            <div>
              <h1>Your Monsters</h1>
              {monsters?.map((monster: monsterType, idx) => {
                return <Card monster={monster} />;
              })}
            </div>
            <div>
              <h1>Locked Monsters</h1>
              {lockedMonsters.map((monster: monsterType, idx) => {
                return <Card monster={monster} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
