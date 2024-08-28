import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import _ from "lodash";
import { monsterType } from "../Pages/monsters/page";
import { addUserMonster } from "../api/api";

// const monsters = [
//   { id: 1, name: "Aquaflare", image: "/images/monsters/Aquaflare.jpeg" },
//   { id: 2, name: "Venomtail", image: "/images/monsters/Venomtail.jpeg" },
//   { id: 3, name: "Stormrider", image: "/images/monsters/Stormrider.jpeg" },
//   // Add more monsters here
// ];

const RandomMonsterSpinner = ({
  allMonsters,
  closeShowGenerateComponent,
  getAllMonsters,
}: {
  allMonsters: monsterType[];
  closeShowGenerateComponent: () => void;
  getAllMonsters?: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState<monsterType | null>(
    null
  );
  const [currentMonsterIndex, setCurrentMonsterIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      interval = setInterval(() => {
        setCurrentMonsterIndex(
          (prevIndex) => (prevIndex + 1) % allMonsters.length
        );
      }, 400); // Change image every 100ms
    }

    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  useEffect(() => {
    if (selectedMonster) {
      addingMonster(selectedMonster);
    }
  }, [selectedMonster]);

  async function addingMonster(selectedMonster: monsterType) {
    await addUserMonster(selectedMonster!._id);
    if (getAllMonsters) {
      getAllMonsters!();
    }
  }

  const generateRandomMonster = () => {
    setLoading(true);
    setSelectedMonster(null);
    setShowPopup(true);

    setTimeout(() => {
      const randomMonster = _.sample(allMonsters);
      setSelectedMonster(randomMonster || allMonsters[0]); // Fallback to first monster if randomMonster is undefined
      setLoading(false);
    }, 5000); // Simulate 3 seconds of spinning
  };

  const closePopup = () => {
    setShowPopup(false);
    setLoading(false);
    closeShowGenerateComponent();
  };

  return (
    <div>
      <button
        onClick={generateRandomMonster}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Generate Random Monster
      </button>

      {showPopup && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="monster-spinner p-5 bg-[#1F2937] rounded shadow-lg border-2 border-primary relative"
            style={{ textAlign: "center" }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-white text-xl mb-2">
                  {allMonsters[currentMonsterIndex].name}
                </h2>
                <img
                  src={allMonsters[currentMonsterIndex].img}
                  alt={allMonsters[currentMonsterIndex].name}
                  style={{ width: "200px", height: "200px", margin: "20px 0" }}
                />
              </motion.div>
            ) : (
              selectedMonster && (
                <>
                  <button
                    onClick={() => closePopup()}
                    className="absolute top-2 right-2 text-white text-2xl"
                  >
                    &times;
                  </button>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-white text-xl mb-2">
                      {selectedMonster.name}
                    </h2>
                    <img
                      src={selectedMonster.img}
                      alt={selectedMonster.name}
                      style={{
                        width: "200px",
                        height: "200px",
                        margin: "20px 0",
                        borderRadius: "10px",
                      }}
                    />
                  </motion.div>
                </>
              )
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default RandomMonsterSpinner;
