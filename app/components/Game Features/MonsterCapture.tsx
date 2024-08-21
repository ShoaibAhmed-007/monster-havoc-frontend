import React from "react";

function MonsterCapture() {
  return (
    <div className="flex justify-center items-center bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="w-[90%] gap-10 flex justify-center items-center py-8 px-20 bg-black bg-opacity-50 rounded-2xl text-white">
        <div className="h-[15em] w-[50%] flex flex-col justify-center gap-4">
          <div className="text-3xl font-bold text-yellow-400">
            Monster Capture
          </div>
          <p className="leading-relaxed text-gray-300">
            The Monster Capture system in Monster Tamer RPG lets you catch wild
            creatures during your adventures, adding them to your growing
            collection. Each capture brings new strategic possibilities as you
            train and battle with your monsters. Expand your team and become the
            ultimate tamer!
          </p>
        </div>
        <img
          className="border-4 border-yellow-400 h-auto w-[50%] rounded-2xl shadow-lg"
          src="/images/logo.png"
          alt="Monster Capture"
        />
      </div>
    </div>
  );
}

export default MonsterCapture;
