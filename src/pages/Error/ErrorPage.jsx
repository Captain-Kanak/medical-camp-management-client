import React from "react";
import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-50 to-white text-center px-6">
      {/* Error Icon */}
      <div className="bg-red-100 p-6 rounded-full mb-6 shadow-md">
        <AlertTriangle className="w-16 h-16 text-red-500" />
      </div>

      {/* Error Code */}
      <h1 className="text-6xl font-extrabold text-gray-800 mb-2 animate-bounce">
        404
      </h1>

      {/* Message */}
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Go Home Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition cursor-pointer"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
