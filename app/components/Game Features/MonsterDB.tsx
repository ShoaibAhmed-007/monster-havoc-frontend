"use client";
import React, { useEffect, useState } from "react";
import Slider from "../Slider";
import { motion } from "framer-motion";
import { getAllMonsters } from "../apiCalls/getAllMonsters";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Monster {
  _id: string;
  name: string;
  type: string; // e.g., "Fire", "Water", "Electric"
  abilities: string[]; // List of abilities
  level: number;
  healthPoints: number;
  attackPower: number;
  defensePower: number;
  speed: number;
  createdAt: Date;
  updatedAt: Date;
  img: string;
}

function MonsterDB() {
  const { userData } = useAppContext();
  const [monsters, setMonsters] = useState<Monster[]>([]);

  useEffect(() => {
    getAllMonsters();
  }, []);

  async function getAllMonsters() {
    try {
      const response = await axios.get(`${baseURL}/api/getAllMonsters`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setMonsters(response.data.monsters);
      } else {
        throw new Error("An error occurred while fetching monsters");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="w-[90%] gap-10 flex justify-center items-center bg-black bg-opacity-50 py-8 px-20 rounded-2xl text-white">
        <div className="h-[15em] w-[150%] flex flex-col justify-center gap-4">
          <div className="text-3xl font-bold text-green-400">
            Monster Database
          </div>
          <p className="leading-relaxed text-gray-300">
            The Monster Database is your key resource in the Monster Havoc RPG,
            offering detailed profiles of every creature you encounter. It
            includes crucial stats, types, and abilities, helping you strategize
            and master the art of taming. Explore and catalog every monster to
            become the ultimate tamer!
          </p>
          {userData ? (
            <Link href="/Pages/monsters">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", damping: 10 }}
                className="rounded-lg border-2 border-white px-6 py-2 hover:text-green-400 hover:border-green-400"
              >
                Go to Monsters
              </motion.button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <Slider data={monsters} />
      </div>
    </div>
  );
}

export default MonsterDB;
