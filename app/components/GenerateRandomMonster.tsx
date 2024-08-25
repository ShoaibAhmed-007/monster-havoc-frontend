import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import _ from "lodash";

const monsters = [
  { id: 1, name: "Aquaflare", image: "/images/monsters/Aquaflare.jpeg" },
  { id: 2, name: "Venomtail", image: "/images/monsters/Venomtail.jpeg" },
  { id: 3, name: "Stormrider", image: "/images/monsters/Stormrider.jpeg" },
  // Add more monsters here
];

type monsterType = {
  id: number;
  name: string;
  image: string;
};

const RandomMonsterSpinner = () => {
  const [loading, setLoading] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState<monsterType | null>(
    null
  );
  const [currentMonsterIndex, setCurrentMonsterIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      interval = setInterval(() => {
        setCurrentMonsterIndex(
          (prevIndex) => (prevIndex + 1) % monsters.length
        );
      }, 100); // Change image every 100ms
    }

    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  const generateRandomMonster = () => {
    setLoading(true);
    setSelectedMonster(null);

    setTimeout(() => {
      const randomMonster = _.sample(monsters);
      setSelectedMonster(randomMonster || monsters[0]); // Fallback to first monster if randomMonster is undefined
      setLoading(false);
    }, 3000); // Simulate 3 seconds of spinning
  };

  return (
    <div className="monster-spinner" style={{ textAlign: "center" }}>
      <button onClick={generateRandomMonster} disabled={loading}>
        Generate Random Monster
      </button>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={monsters[currentMonsterIndex].image}
            alt={monsters[currentMonsterIndex].name}
            style={{ width: "200px", height: "200px", margin: "20px 0" }}
          />
        </motion.div>
      ) : (
        selectedMonster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>{selectedMonster.name}</h2>
            <img
              src={selectedMonster.image}
              alt={selectedMonster.name}
              style={{ width: "200px", height: "200px", margin: "20px 0" }}
            />
          </motion.div>
        )
      )}
    </div>
  );
};

export default RandomMonsterSpinner;
