"use client";
import React from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/app/context/AppContext";

function Marketplace() {
  const { userData } = useAppContext();
  return (
    <div className="flex justify-center items-center bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="w-[90%] flex flex-col justify-center items-center space-y-8 bg-black bg-opacity-50 py-8 px-20 rounded-2xl text-white">
        <div className="max-w-[600px] space-y-5">
          <div className="text-3xl font-bold text-center text-green-400">
            Marketplace
          </div>
          <p className="leading-relaxed text-gray-300 text-center">
            The Marketplace in the Monster Tamer RPG is your go-to hub for
            trading and acquiring essential items. Browse through a vast
            selection of gear, potions, and rare artifacts to enhance your
            monsters and boost your adventure. Make savvy purchases and trades
            to stay ahead in the world of taming!
          </p>
          <img
            className="border-4 border-green-500 rounded-2xl w-full shadow-lg"
            src="/images/logo.png"
            alt="Marketplace"
          />
          {userData ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 10 }}
              className="w-full rounded-lg border-2 border-white px-6 py-2 hover:text-green-400 hover:border-green-400"
            >
              Go to Marketplace
            </motion.button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
