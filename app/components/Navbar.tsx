"use client";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { userData, logoutUser } = useAppContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="bg-[rgba(0,0,0,0.8)] text-white py-4 px-4 md:px-8 relative top-0 w-full z-50">
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

          {/* Profile Info or Signup/Login Buttons */}
          {userData ? (
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <Image
                  src={userData.profilePic || "/images/default-profile.png"}
                  alt="profile pic"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="ml-2">{userData.name}</span>
                <FiChevronDown size={24} className="ml-2" />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[rgba(0,0,0,0.9)] text-white rounded-lg shadow-lg py-2">
                  <Link href="/Pages/profile/settings">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", damping: 10 }}
                      className="px-4 py-2 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      Profile Settings
                    </motion.div>
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="px-4 py-2 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer"
                    onClick={() => {
                      toggleDropdown();
                      logoutUser();
                    }}
                  >
                    Logout
                  </motion.div>
                </div>
              )}
            </div>
          ) : (
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
          )}
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
            {/* Conditional Rendering of Signup/Login Buttons */}
            {!userData && (
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
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
