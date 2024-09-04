"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { monsterType, statsType } from "@/app/Pages/monsters/page";
import Card from "../Card";
import { useAppContext } from "@/app/context/AppContext";

type abilitiesType = {
  name: string;
  power: string;
  type: string;
  _id: string;
};

type serverMonsterType = {
  _id: string;
  name: string;
  type: string;
  stats: statsType;
  abilities: abilitiesType[] | undefined;
};

export interface userMonsterType {
  abilities: abilitiesType[];
  monster: monsterType;
  monsterLevel: number;
}

function MonsterSelection() {
  const { socket, userData } = useAppContext();
  const [monsters, setMonsters] = useState<userMonsterType[]>([]);
  const [selectedMonsterId, setSelectedMonsterId] = useState<string | null>(
    null
  );

  const listenerAddedRef = useRef(false);

  const [countdown, setCountdown] = useState<number | null>(15);

  async function getUserMonsters() {
    const fetchedUserMonsters = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUserMonsters`,
      { withCredentials: true }
    );

    const userMonsters: userMonsterType[] =
      fetchedUserMonsters.data.monsters.map((evolObj: any) => {
        console.log(evolObj, "Evol Obj");
        const mainMonster = {
          abilities: evolObj.abilities,
          monster: evolObj.monster as monsterType,
          monsterLvl: evolObj.monsterLevel,
        };
        return mainMonster;
      });

    setMonsters(userMonsters);
  }

  const selectMonster = (monsterId: string) => {
    console.log("Monster ID clicked:", monsterId);
    setSelectedMonsterId(monsterId);
  };

  const handleSubmit = (monsterId?: string) => {
    if (selectedMonsterId || monsterId) {
      const selectedMonster = monsters.find(
        (monsterObj) =>
          monsterObj.monster._id === monsterId || selectedMonsterId
      );
      if (selectedMonster) {
        console.log(selectedMonster);
        const { _id, name, stats, type }: any = selectedMonster?.monster;
        const finalMonster: serverMonsterType = {
          _id,
          name,
          stats,
          type,
          abilities: selectedMonster?.abilities,
        };
        console.log("Selected Monster:", finalMonster);
        socket?.current?.emit("start_battle", finalMonster, userData?._id);
      } else {
        console.log("Monster not found");
      }
    } else {
      console.log("No monster selected");
    }
  };

  useEffect(() => {
    getUserMonsters();
  }, []);

  useEffect(() => {
    //if user has not selected any monster in given countdown we will select the monster with highest level my default
    if (countdown === 0) {
      let monsterWithHighestLevel: userMonsterType = monsters.reduce(
        (highest, current) => {
          return current.monsterLevel > highest.monsterLevel
            ? current
            : highest;
        },
        monsters[0]
      );

      setSelectedMonsterId(monsterWithHighestLevel.monster._id);
      setTimeout(() => {
        handleSubmit(monsterWithHighestLevel.monster._id);
      }, 2000);
    }
  }, [countdown]);

  useEffect(() => {
    if (socket?.current && !listenerAddedRef.current) {
      const handleCountdownUpdate = (updated_countdown: number) => {
        setCountdown(updated_countdown);
      };

      socket.current.on("countdown_update", handleCountdownUpdate);
      listenerAddedRef.current = true; // Mark the listener as added

      socket.current.emit("select_monster_countdown_start", userData?._id);

      return () => {
        socket.current?.off("countdown_update", handleCountdownUpdate);
        listenerAddedRef.current = false; // Reset when unmounting
      };
    }
  }, []);

  return (
    <>
      {countdown && <h1>Time remaining: {countdown}</h1>}
      <h1 className="text-xl text-center font-bold my-3">
        Select Your Monster
      </h1>
      <div className="grid grid-cols-4">
        {monsters.map((monsterObj) => (
          <div
            onClick={() => selectMonster(monsterObj.monster._id)}
            key={monsterObj.monster._id}
          >
            <Card
              monster={monsterObj.monster}
              selectedMonster={selectedMonsterId!}
            />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center">
        <button className="btn-primary" onClick={() => handleSubmit()}>
          Start Battle
        </button>
      </div>
    </>
  );
}

export default MonsterSelection;
