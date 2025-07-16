import React from "react";
import { FaHeartbeat, FaAppleAlt, FaRunning } from "react-icons/fa";

const tips = [
  {
    icon: <FaHeartbeat className="text-red-500 text-2xl" />,
    title: "Regular Checkups",
    desc: "Schedule regular health checkups to detect problems early.",
  },
  {
    icon: <FaAppleAlt className="text-green-500 text-2xl" />,
    title: "Eat Healthy",
    desc: "Include fruits, vegetables, and whole grains in your diet.",
  },
  {
    icon: <FaRunning className="text-blue-500 text-2xl" />,
    title: "Stay Active",
    desc: "Engage in at least 30 minutes of physical activity daily.",
  },
];

const HealthTips = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Health Tips</h2>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
        className="grid gap-6 md:grid-cols-3"
      >
        {tips.map((tip, i) => (
          <div
            key={i}
            className="p-6 bg-base-200 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="mb-3">{tip.icon}</div>
            <h4 className="font-semibold text-lg mb-1">{tip.title}</h4>
            <p>{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTips;
