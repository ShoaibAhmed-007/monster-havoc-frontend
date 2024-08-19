import React from "react";

function MonsterCapture() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-[90%] gap-10 flex justify-center items-center  border-2 border-white py-8 px-20 rounded-2xl text-white">
          <div className="h-[15em] w-[50%] flex flex-col justify-center gap-4">
            <div className="text-2xl font-bold">Monster Capture</div>
            <p>
              The Monster Capture system in Monster Tamer RPG lets you catch
              wild creatures during your adventures, adding them to your growing
              collection. Each capture brings new strategic possibilities as you
              train and battle with your monsters. Expand your team and become
              the ultimate tamer!
            </p>
          </div>
          <img
            className="border-2 border-white h w-[50%] rounded-2xl"
            src="/images/logo.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default MonsterCapture;
