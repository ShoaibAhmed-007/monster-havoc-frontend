"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center bg-[rgba(0,0,0,0.3)] py-4 px-4 md:px-8 text-white xl:text-lg lg:text-base md:text-sm sm:text-xs max-sm:text-[9px]">
        {/* Logo and Menu Links */}
        <div className="flex justify-between items-center w-full md:w-[28%]">
          <img
            className="xl:h-12 lg:h-10 md:h-8 sm:h-6 max-sm:h-6"
            src="/images/logo.png"
            alt="logo"
          />

          {/* Hamburger Menu Button for small screens */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? (
                <FiX size={24} className="text-white" />
              ) : (
                <FiMenu size={24} className="text-white" />
              )}
            </button>
          </div>

          {/* Nav Links for larger screens */}
          <div className="hidden md:flex justify-around items-center gap-5">
            <div>
              <Link href="#gameFeatures">Game Features</Link>
            </div>
            <div>
              <Link href="#">Latest Updates</Link>
            </div>
          </div>
        </div>

        {/* Signup and Login Buttons */}
        <div className="hidden md:flex justify-around w-[20%] pr-5 gap-4">
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

      {/* Dropdown Menu for small screens */}
      {isOpen && (
        <div className="md:hidden bg-[rgba(0,0,0,0.9)] text-white flex flex-col items-center py-4">
          <div className="py-2">
            <Link href="#">Game Features</Link>
          </div>
          <div className="py-2">
            <Link href="#">Latest Updates</Link>
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 10 }}
              className="rounded-full border-2 border-white xl:px-8 xl:py-2 py-1 lg:px-6 md:px-4 sm:px-3 max-sm:px-2 my-2"
            >
              Signup
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 10 }}
              className="rounded-full border-2 border-white xl:px-8 xl:py-2 py-1 lg:px-6 md:px-4 sm:px-3 max-sm:px-2 my-2"
            >
              Login
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
