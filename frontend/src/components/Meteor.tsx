// import clsx from "clsx";
// import React from "react";

// export const Meteors = ({ number }: { number?: number }) => {
//   const meteors = new Array(number || 20).fill(true);
//   return (
//     <>
//       {meteors.map((el, idx) => (
//         <span
//           key={"meteor" + idx}
//           className={clsx(
//             "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
//             "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
//           )}
//           style={{
//             top: 0,
//             left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
//             animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
//             animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
//           }}
//         ></span>
//       ))}
//     </>
//   );
// };

// src/components/Meteor.tsx
import { motion } from "framer-motion";
import React from "react";

const Meteor: React.FC = () => {
  const getRandomValue = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  // Calculate meteor path
  const startY = getRandomValue(-50, -10);
  const startX = getRandomValue(-20, 120);
  const endY = getRandomValue(100, 150);
  const endX = getRandomValue(-50, 150);
  const angle = (Math.atan2(endY - startY, endX - startX) * 180) / Math.PI;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: `${startY}%`,
        left: `${startX}%`,
        rotate: `${angle}deg`,
      }}
      initial={{
        opacity: getRandomValue(0.5, 1),
        x: 0,
        y: 0,
      }}
      animate={{
        opacity: 0,
        x: `${endX - startX}vw`,
        y: `${endY - startY}vh`,
      }}
      transition={{
        duration: getRandomValue(3, 6),
        delay: getRandomValue(0, 3),
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      {/* Meteor head */}
      <div className="absolute h-1 w-1 bg-white rounded-full shadow-[0_0_8px_2px_#fff]" />

      {/* Meteor tail */}
      <div className="absolute h-[1px] w-32 bg-gradient-to-r from-white via-indigo-400 to-transparent shadow-[0_0_10px_1px_#6366f1]" />
    </motion.div>
  );
};

// Star Component
const Star: React.FC = () => {
  return (
    <motion.div
      className="absolute bg-white rounded-full shadow-star"
      style={{
        width: `${Math.random() * 3}px`,
        height: `${Math.random() * 3}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
      animate={{
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration: Math.random() * 3 + 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const MeteorShower: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Stars */}
      {[...Array(100)].map((_, i) => (
        <Star key={i} />
      ))}

      {/* Meteors */}
      {[...Array(8)].map((_, i) => (
        <Meteor key={i} />
      ))}
    </div>
  );
};

export default MeteorShower;
