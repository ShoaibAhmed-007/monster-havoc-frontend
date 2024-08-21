import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[rgba(0,0,0,0.8)] text-white py-10">
      <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and About */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0">
          <img src="/images/logo-lg.png" alt="logo" className="h-20 mb-4" />
          <p className="text-sm md:text-base">
            Unleash the Beasts, Conquer the Wild! Join the adventure and become
            the ultimate monster tamer.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-4 text-center md:text-left mb-6 md:mb-0">
          <Link href="#gameFeatures" className="hover:text-primary">
            Game Features
          </Link>
          <Link href="#" className="hover:text-primary">
            Latest Updates
          </Link>
          <Link href="#" className="hover:text-primary">
            Leaderboard
          </Link>
          <Link href="#" className="hover:text-primary">
            Contact Us
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaYoutube size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Monster Tamer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
