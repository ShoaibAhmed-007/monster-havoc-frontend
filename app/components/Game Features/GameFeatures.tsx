import React from "react";
import MonsterDB from "./MonsterDB";
import BattleSystem from "./BattleSystem";
import MonsterCapture from "./MonsterCapture";
import Marketplace from "./Marketplace";

function GameFeatures() {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="text-center text-white text-4xl font-bold">
          Game Features
        </div>
        <MonsterDB />
        <BattleSystem />
        <MonsterCapture />
        <Marketplace />
      </div>
    </>
  );
}

export default GameFeatures;
