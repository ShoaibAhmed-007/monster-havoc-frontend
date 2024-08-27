"use client";

import { useAppContext, UserDataType } from "@/app/context/AppContext";
import { useEffect, useState } from "react";

function BattlePit() {
  const { socket, userData } = useAppContext();
  const [opponent, setOpponent] = useState<UserDataType | null>(null);

  const [isInQueue, setIsInQueue] = useState<boolean>(true);

  useEffect(() => {
    if (socket && userData) {
      socket?.on("match_found", (Opponent: UserDataType) => {
        setOpponent(Opponent);
        console.log("Opponent found: ", Opponent.name);
        setIsInQueue(false);
      });

      return () => {
        socket?.off("match_found");
      };
    }
  }, [socket, userData]);

  return (
    <>
      <div>
        {isInQueue && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-red-500 z-50 flex justify-center items-center h-full w-full">
            <p>You are in matchmaking queue</p>
          </div>
        )}
        <h1>Battle Page</h1>
        {opponent ? (
          <div>
            <p>You have been matched with {opponent.name}</p>
          </div>
        ) : (
          <p>Waiting for an opponent...</p>
        )}
      </div>
    </>
  );
}
export default BattlePit;
