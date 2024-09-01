import React from "react";
import Image from "next/image";
import {
  FaHeart,
  FaShieldAlt,
  FaBolt,
  FaFistRaised,
  FaCheckCircle,
} from "react-icons/fa"; // Font Awesome icons
import { monsterType } from "../Pages/monsters/page";

type cardProps = {
  monster: monsterType;
  selectedMonster: string | null;
};

function Card({ monster, selectedMonster }: cardProps) {
  return (
    <div
      className={`relative cursor-pointer transition-all  ${
        monster._id === selectedMonster
          ? "brightness-125 cursor-default"
          : "hover:brightness-125"
      } min-w-64 max-w-64 flex flex-col gap-2 p-4 bg-gray-800 rounded-lg shadow-lg border-2 border-yellow-500`}
    >
      {monster._id === selectedMonster && (
        <div className="absolute top-2 right-3">
          <FaCheckCircle color="#65CDAA" />
        </div>
      )}

      <div className="text-center text-white font-bold text-lg">
        {monster?.name}
      </div>
      <div className="relative">
        <Image
          height={220}
          width={220}
          src={monster?.img}
          alt="Pyrofang"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1 text-white">
        <div className="text-center">
          <span className="font-bold">Type:</span> {monster?.type}
        </div>
        <div className="flex flex-col w-full gap-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <FaHeart className="text-red-500" />
              <span className="font-bold">Health:</span>{" "}
              {monster?.stats?.health?.toString()}
            </div>
            <div className="flex items-center gap-1">
              <FaFistRaised className="text-yellow-500" />
              <span className="font-bold">Attack:</span>{" "}
              {monster?.stats?.attack?.toString()}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <FaShieldAlt className="text-blue-500" />
              <span className="font-bold">Defense:</span>{" "}
              {monster?.stats?.defense?.toString()}
            </div>
            <div className="flex items-center gap-1">
              <FaBolt className="text-green-500" />
              <span className="font-bold">Speed:</span>{" "}
              {monster?.stats?.speed?.toString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
