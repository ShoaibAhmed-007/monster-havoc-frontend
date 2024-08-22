import Card from "@/app/components/Card";
import React from "react";

function page() {
  return (
    <>
      <div className="flex justify-center items-center py-10">
        <div className="bg-black bg-opacity-50 p-5 flex flex-col items-center">
          <h1>Your Monsters</h1>
          <div className="bg-black bg-opacity-70 h-96 w-96">
            {/* <Card /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
