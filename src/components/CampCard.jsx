import React from "react";
import { Link } from "react-router";

const CampCard = ({ camp }) => {
  const {
    _id,
    image,
    campName,
    location,
    healthcareProfessional,
    fees,
    participantCount,
    datetime,
  } = camp;

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      className="group relative border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden 
                 shadow-md hover:shadow-xl transition-shadow duration-500 bg-white/70 dark:bg-gray-900/70 
                 backdrop-blur-lg flex flex-col"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={campName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <h3 className="absolute bottom-3 left-3 text-xl font-bold text-white drop-shadow-lg">
          {campName}
        </h3>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          <p>
            <span className="font-semibold">📍 Location:</span> {location}
          </p>
          <p>
            <span className="font-semibold">👨‍⚕️ Professional:</span>{" "}
            {healthcareProfessional}
          </p>
          <p>
            <span className="font-semibold">💰 Fees:</span> ${fees}
          </p>
          <p>
            <span className="font-semibold">👥 Participants:</span>{" "}
            {participantCount}
          </p>
          <p>
            <span className="font-semibold">📅 Date:</span>{" "}
            {new Date(datetime).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        {/* Button */}
        <Link to={`/camp-details/${_id}`}>
          <button
            className="mt-5 w-full py-2 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 
                             text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] 
                             transition-all duration-300 cursor-pointer"
          >
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CampCard;
