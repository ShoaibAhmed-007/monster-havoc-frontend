"use client";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <>
      <div className="w-screen flex justify-between items-center bg-[rgba(0,0,0,0.9)] py-4 px-2 text-white xl:text-lg lg:text-base md:text-sm sm:text-xs max-sm:text-[9px]">
        <div className="flex justify-around items-center w-[35%]">
          <img
            className="xl:h-12 lg:h-10 md:h-8 sm:h-6 max-sm:h-6"
            src="/images/logo.png"
            alt="logo"
          />
          <div>Game Features</div>
          <div>Latest Updates</div>
        </div>
        <div className="flex justify-around w-[20%] pr-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", damping: 10 }}
            className="rounded-full border-2 border-white xl:px-8 xl:py-2 py-1 lg:px-6 md:px-4 sm:px-3 max-sm:px-2"
          >
            Signup
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", damping: 10 }}
            className="rounded-full border-2 border-white xl:px-8 xl:py-2 py-1 lg:px-6 md:px-4 sm:px-3 max-sm:px-2"
          >
            Login
          </motion.button>
        </div>
      </div>
    </>
  );
}
export default Navbar;
