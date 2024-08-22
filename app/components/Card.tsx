import React from "react";
import Image from "next/image";
import { FaHeart, FaShieldAlt, FaBolt, FaFistRaised } from "react-icons/fa"; // Font Awesome icons

function Card() {
  return (
    <div className="min-w-64 max-w-64 flex flex-col gap-2 p-4 bg-gray-800 rounded-lg shadow-lg border-2 border-yellow-500">
      <div className="text-center text-white font-bold text-lg">Pyrofang</div>
      <div className="relative">
        <Image
          height={220}
          width={220}
          src="/Images/monsters/Pyrofang.jpeg"
          alt="Pyrofang"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1 text-white">
        <div className="text-center">
          <span className="font-bold">Type:</span> Fire
        </div>
        <div className="flex flex-col w-full gap-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <FaHeart className="text-red-500" />
              <span className="font-bold">Health:</span> 70
            </div>
            <div className="flex items-center gap-1">
              <FaFistRaised className="text-yellow-500" />
              <span className="font-bold">Attack:</span> 80
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <FaShieldAlt className="text-blue-500" />
              <span className="font-bold">Defense:</span> 60
            </div>
            <div className="flex items-center gap-1">
              <FaBolt className="text-green-500" />
              <span className="font-bold">Speed:</span> 90
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
