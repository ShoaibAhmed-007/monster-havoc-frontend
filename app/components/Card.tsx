// import React from "react";
// import Image from "next/image";
// import { FaHeart, FaShieldAlt, FaBolt, FaFistRaised } from "react-icons/fa"; // Font Awesome icons

// type statsType = {
//   attack: Number;
//   defense: Number;
//   speed: Number;
//   health: Number;
// };

// type monsterType = {
//   name: string;
//   img: string;
//   type: string;
//   abilities: string[];
//   stats: statsType;
//   description: string;
//   evolution: string;
// };

// function Card({ monster }: monsterType) {
//   return (
//     <div className="min-w-64 max-w-64 flex flex-col gap-2 p-4 bg-gray-800 rounded-lg shadow-lg border-2 border-yellow-500">
//       <div className="text-center text-white font-bold text-lg">
//         {monster.name}
//       </div>
//       <div className="relative">
//         <Image
//           height={220}
//           width={220}
//           src={monster.img}
//           alt="Pyrofang"
//           className="rounded-lg"
//         />
//       </div>
//       <div className="flex flex-col gap-1 text-white">
//         <div className="text-center">
//           <span className="font-bold">Type:</span> {monster.type}
//         </div>
//         <div className="flex flex-col w-full gap-1">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-1">
//               <FaHeart className="text-red-500" />
//               <span className="font-bold">Health:</span> {monster.health}
//             </div>
//             <div className="flex items-center gap-1">
//               <FaFistRaised className="text-yellow-500" />
//               <span className="font-bold">Attack:</span> {monster.attack}
//             </div>
//           </div>
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-1">
//               <FaShieldAlt className="text-blue-500" />
//               <span className="font-bold">Defense:</span> {monster.defense}
//             </div>
//             <div className="flex items-center gap-1">
//               <FaBolt className="text-green-500" />
//               <span className="font-bold">Speed:</span> {monster.speed}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Card;
