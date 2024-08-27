"use client";

import { useAppContext, UserDataType } from "@/app/context/AppContext";
import { useEffect, useState } from "react";

function BattlePit() {
  const { socket, userData } = useAppContext();
  const [opponent, setOpponent] = useState<UserDataType | null>(null);

  const [isInQueue, setIsInQueue] = useState<boolean>(true);

  useEffect(() => {
    if (socket.current && userData) {
      console.log("Setting up match_found listener for:", userData.name);
      console.log("Socket ID:", socket.current.id);

      socket.current.on("match_found", (Opponent: UserDataType) => {
        console.log("Match found event received.");
        setOpponent(Opponent);
        console.log("Opponent found:", Opponent.name);
        setIsInQueue(false);
      });
      socket.current.emit("attempt_matchmaking");
      return () => {
        console.log("Cleaning up match_found listener for:", userData.name);
        socket.current?.off("match_found");
      };
    }
  }, [socket.current, userData]);

  // useEffect(() => {
  //   if (socket.current && userData) {
  //     socket.current?.on("match_found", (Opponent: UserDataType) => {
  //       console.log("Here");
  //       setOpponent(Opponent);
  //       console.log("Opponent found: ", Opponent.name);
  //       setIsInQueue(false);
  //     });

  //     return () => {
  //       socket.current?.off("match_found");
  //     };
  //   }
  // }, [socket.current, userData]);

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
