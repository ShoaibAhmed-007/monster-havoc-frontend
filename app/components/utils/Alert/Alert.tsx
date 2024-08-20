import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface AlertProps {
  message: string;
  type: "info" | "danger" | "success" | "warning" | "dark" | null;
  setVisible?: () => void;
}

const alertStyles: Record<string, string> = {
  info: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
  danger: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
  success: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
  warning: "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
  dark: "text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300",
};

const Alert: React.FC<AlertProps> = ({ message, type, setVisible }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (setVisible) {
      setIsVisible(true);
    }
  }, [message, setVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (setVisible) setVisible();
    }, 300); // Match the animation duration
  };

  if (!message || !type) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 right-5 transform -translate-x-1/2 z-50 p-4 text-sm rounded-lg shadow-lg flex justify-between items-center w-11/12 max-w-md ${alertStyles[type]}`}
          role="alert"
        >
          <span>{message}</span>
          <button
            onClick={handleDismiss}
            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <IoClose
              size={19}
              className="text-[#CCCCCC] font-extrabold hover:!text-[#999999] transition-colors cursor-pointer align-middle"
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
