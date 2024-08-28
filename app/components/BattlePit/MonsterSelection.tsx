"use client";
import React, { useEffect, useState } from "react";
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
}

function MonsterSelection() {
  const { socket, userData } = useAppContext();
  const [monsters, setMonsters] = useState<userMonsterType[]>([]);
  const [selectedMonsterId, setSelectedMonsterId] = useState<string | null>(
    null
  );

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

  const handleClick = (monsterId: string) => {
    console.log("Monster ID clicked:", monsterId);
    setSelectedMonsterId(monsterId);
  };

  const handleSubmit = () => {
    if (selectedMonsterId) {
      const selectedMonster = monsters.find(
        (monsterObj) => monsterObj.monster._id === selectedMonsterId
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
        socket?.current?.emit("monster_selected", finalMonster, userData?._id);
      } else {
        console.log("Monster not found");
      }
    } else {
      console.log("No monster selected");
    }
  };

  useEffect(() => {
    getUserMonsters();

    if (socket?.current) {
      socket?.current?.on("countdown_update", (updated_countdown) => {
        console.log(updated_countdown);
        setCountdown(updated_countdown);
      });

      socket?.current?.emit("select_monster_countdown_start", userData?._id);
    }
  }, [socket?.current]);

  return (
    <>
      {countdown && <h1>Time remaining: {countdown}</h1>}
      <h1 className="text-xl text-center font-bold my-3">
        Select Your Monster
      </h1>
      <div className="grid grid-cols-4">
        {monsters.map((monsterObj) => (
          <div
            onClick={() => handleClick(monsterObj.monster._id)}
            key={monsterObj.monster._id}
          >
            <Card monster={monsterObj.monster} />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Select Monster</button>
    </>
  );
}

export default MonsterSelection;
