"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { monsterType, statsType } from "@/app/Pages/monsters/page";
import Card from "../Card";

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

interface userMonsterType {
  abilities: abilitiesType[];
  monster: monsterType;
}

function MonsterSelection() {
  const [monsters, setMonsters] = useState<userMonsterType[]>([]);
  const [selectedMonsterId, setSelectedMonsterId] = useState<string | null>(
    null
  );

  async function getUserMonsters() {
    const fetchedMonsters = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUserMonsters`,
      { withCredentials: true }
    );

    const userMonsters: userMonsterType[] = fetchedMonsters.data.monsters.map(
      (evolObj: any) => {
        console.log(evolObj, "Evol Obj");
        const mainMonster = {
          abilities: evolObj.abilities,
          monster: evolObj.monster as monsterType,
        };
        return mainMonster;
      }
    );

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

  return (
    <>
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
