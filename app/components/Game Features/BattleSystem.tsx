import React from "react";

function BattleSystem() {
  return (
    <div className="flex justify-center items-center bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="w-[90%] gap-10 flex justify-center items-center bg-black bg-opacity-50 py-8 px-20 rounded-2xl text-white">
        <img
          className="border-4 border-red-500 w-[50%] h-auto rounded-2xl shadow-lg"
          src="/images/logo.png"
          alt="Battle System"
        />
        <div className="h-[15em] w-[50%] flex flex-col justify-center gap-4">
          <div className="text-3xl font-bold text-red-400">Battle System</div>
          <p className="leading-relaxed text-gray-300">
            The Battle System in Monster Tamer RPG offers thrilling, turn-based
            combat where you pit your trained monsters against wild creatures
            and rival tamers. Each battle tests your strategy, with outcomes
            affecting your experience points and monster status. Master the art
            of combat to rise as the ultimate tamer!
          </p>
        </div>
      </div>
    </div>
  );
}

export default BattleSystem;
