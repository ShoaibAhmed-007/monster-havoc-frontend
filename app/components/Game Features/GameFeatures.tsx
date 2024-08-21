import React from "react";
import MonsterDB from "./MonsterDB";
import BattleSystem from "./BattleSystem";
import MonsterCapture from "./MonsterCapture";
import Marketplace from "./Marketplace";

function GameFeatures() {
  return (
    <div className="flex flex-col gap-10 bg-gradient-to-b from-gray-800 to-black p-10 rounded-lg shadow-lg">
      <div className="text-center text-white text-4xl font-extrabold drop-shadow-md">
        Game Features
      </div>
      <MonsterDB />
      <BattleSystem />
      <MonsterCapture />
      <Marketplace />
    </div>
  );
}

export default GameFeatures;
