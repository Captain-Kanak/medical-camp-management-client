import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="relative w-16 h-16">
        {/* Outer gradient ring */}
        <div className="w-16 h-16 border-4 border-transparent rounded-full animate-spin bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500" />

        {/* Inner circle for contrast */}
        <div className="absolute inset-2 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default Spinner;
