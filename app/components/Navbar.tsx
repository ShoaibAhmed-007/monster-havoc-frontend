"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-[rgba(0,0,0,0.8)] text-white py-4 px-4 md:px-8 fixed top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Menu Links */}
          <div className="flex justify-between items-center w-full md:w-auto">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={80}
                height={80}
                className="cursor-pointer"
              />
            </Link>

            {/* Hamburger Menu Button for small screens */}
            <div className="md:hidden">
              <button onClick={toggleMenu} aria-label="Toggle Menu">
                {isOpen ? (
                  <FiX size={24} className="text-white" />
                ) : (
                  <FiMenu size={24} className="text-white" />
                )}
              </button>
            </div>

            {/* Nav Links for larger screens */}
            <div className="hidden md:flex justify-around items-center ml-8 gap-8">
              <Link href="#gameFeatures" className="hover:text-primary">
                Game Features
              </Link>
              <Link href="#" className="hover:text-primary">
                Latest Updates
              </Link>
            </div>
          </div>

          {/* Signup and Login Buttons */}
          <div className="hidden md:flex justify-around items-center gap-4">
            <Link href="/Pages/auth/signup">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", damping: 10 }}
                className="rounded-lg border-2 border-white px-6 py-2 hover:text-primary hover:border-primary"
              >
                Signup
              </motion.button>
            </Link>
            <Link href="/Pages/auth/login">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", damping: 10 }}
                className="rounded-lg border-2 border-white px-6 py-2 hover:text-primary hover:border-primary"
              >
                Login
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Dropdown Menu for small screens */}
        {isOpen && (
          <div className="md:hidden bg-[rgba(0,0,0,0.9)] text-white flex flex-col items-center py-4">
            <Link
              href="#gameFeatures"
              className="py-2 hover:text-primary"
              onClick={toggleMenu}
            >
              Game Features
            </Link>
            <Link
              href="#"
              className="py-2 hover:text-primary"
              onClick={toggleMenu}
            >
              Latest Updates
            </Link>
            <div className="flex flex-col items-center gap-4 mt-4">
              <Link href="/Pages/auth/signup">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", damping: 10 }}
                  className="rounded-full border-2 border-white px-8 py-2 hover:text-primary hover:border-primary"
                  onClick={toggleMenu}
                >
                  Signup
                </motion.button>
              </Link>
              <Link href="/Pages/auth/login">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", damping: 10 }}
                  className="rounded-full border-2 border-white px-8 py-2 hover:text-primary hover:border-primary"
                  onClick={toggleMenu}
                >
                  Login
                </motion.button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
