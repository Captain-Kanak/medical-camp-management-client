import React from "react";
import { FaHeartbeat, FaAppleAlt, FaRunning } from "react-icons/fa";

const tips = [
  {
    icon: <FaHeartbeat className="text-red-500 text-3xl" />,
    title: "Regular Checkups",
    desc: "Schedule regular health checkups to detect problems early.",
    bg: "from-red-400 to-red-600",
  },
  {
    icon: <FaAppleAlt className="text-green-500 text-3xl" />,
    title: "Eat Healthy",
    desc: "Include fruits, vegetables, and whole grains in your diet.",
    bg: "from-green-400 to-green-600",
  },
  {
    icon: <FaRunning className="text-blue-500 text-3xl" />,
    title: "Stay Active",
    desc: "Engage in at least 30 minutes of physical activity daily.",
    bg: "from-blue-400 to-blue-600",
  },
];

const HealthTips = () => {
  return (
    <div className="pt-8 lg:pt-16 max-w-7xl mx-auto px-4 lg:px-0">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-extrabold">Health Tips</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Simple but effective tips to maintain a healthy lifestyle and boost
          overall well-being.
        </p>
      </div>

      {/* Tips Grid */}
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
        className="grid gap-8 md:grid-cols-3"
      >
        {tips.map((tip, i) => (
          <div
            key={i}
            className={`relative p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-gradient-to-br ${tip.bg} text-white`}
          >
            {/* Icon Circle */}
            <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-full mb-4 animate-bounce-slow">
              {tip.icon}
            </div>

            <h4 className="font-bold text-xl mb-2">{tip.title}</h4>
            <p className="text-white/90">{tip.desc}</p>

            {/* Decorative Glow */}
            <div className="absolute -top-5 -right-5 w-12 h-12 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTips;
