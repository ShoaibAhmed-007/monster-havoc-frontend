import React from "react";

function BattleSystem() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-[90%] gap-10 flex justify-center items-center  border-2 border-white py-8 px-20 rounded-2xl text-white">
          <img
            className="border-2 border-white h w-[50%] rounded-2xl"
            src="/images/logo.png"
            alt=""
          />
          <div className="h-[15em] w-[50%] flex flex-col justify-center gap-4">
            <div className="text-2xl font-bold">Battle System</div>
            <p>
              The Battle System in Monster Tamer RPG offers thrilling,
              turn-based combat where you pit your trained monsters against wild
              creatures and rival tamers. Each battle tests your strategy, with
              outcomes affecting your experience points and monster status.
              Master the art of combat to rise as the ultimate tamer!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BattleSystem;
