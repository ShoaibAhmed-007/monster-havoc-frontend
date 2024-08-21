import React from "react";
import Slider from "../Slider";
import monsters from "../../data/monster";

function MonsterDB() {
  return (
    <div className="flex justify-center items-center bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="w-[90%] gap-10 flex justify-center items-center bg-black bg-opacity-50 py-8 px-20 rounded-2xl text-white">
        <div className="h-[15em] w-[80%] flex flex-col justify-center gap-4">
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
        </div>
        <Slider data={monsters} />
      </div>
    </div>
  );
}

export default MonsterDB;
