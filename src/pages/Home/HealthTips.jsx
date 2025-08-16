import React from "react";
import { FaHeartbeat, FaAppleAlt, FaRunning, FaBed } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const tips = [
  {
    icon: <FaHeartbeat className="text-blue-500 text-3xl" />,
    title: "Regular Checkups",
    desc: "Schedule regular health checkups to detect problems early.",
  },
  {
    icon: <FaAppleAlt className="text-indigo-600 text-3xl" />,
    title: "Eat Healthy",
    desc: "Include fruits, vegetables, and whole grains in your diet.",
  },
  {
    icon: <FaRunning className="text-blue-500 text-3xl" />,
    title: "Stay Active",
    desc: "Engage in at least 30 minutes of physical activity daily.",
  },
  {
    icon: <FaBed className="text-indigo-600 text-3xl" />,
    title: "Sleep Well",
    desc: "Ensure 7-8 hours of quality sleep to recharge your body and mind.",
  },
];

const HealthTips = () => {
  return (
    <div className="pt-8 lg:pt-16 max-w-7xl mx-auto px-4 lg:px-0">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold">Health Tips</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Simple but effective tips to maintain a healthy lifestyle and boost
          overall well-being.
        </p>
      </div>

      {/* Tips Grid */}
      <div
        data-aos="fade-up"
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
      >
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
          >
            {/* Inner Card */}
            <div className="bg-white rounded-2xl h-full p-6 text-center">
              {/* Icon Circle */}
              <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-50 rounded-full mb-4 shadow-md">
                {tip.icon}
              </div>

              <h4 className="font-bold text-xl text-indigo-600 mb-2">
                {tip.title}
              </h4>
              <p className="text-gray-600">{tip.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HealthTips;
