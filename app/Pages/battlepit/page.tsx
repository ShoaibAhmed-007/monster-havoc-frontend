import React from "react";
import Signup from "@/app/components/Forms/Signup";
import BattlePit from "@/app/components/BattlePit/BattlePit";

function page() {
  return (
    <>
      <div className="h-[100vh] flex justify-center items-center">
        <BattlePit />
      </div>
    </>
  );
}

export default page;
