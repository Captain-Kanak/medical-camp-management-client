import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router";
import Spinner from "../../components/Spinner";
import CampCard from "../../components/CampCard";

const PopularCamps = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: camps = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popularCamps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/camps/popular");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load popular camps.
      </p>
    );

  return (
    <div className="pt-8 lg:pt-16 max-w-7xl mx-auto px-4 lg:px-0">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold">
          Popular Medical Camps
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover our most popular medical camps based on participant interest.
          These top-rated camps offer quality healthcare services at various
          locations and are trusted by our community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {camps.map((camp) => (
          <CampCard key={camp._id} camp={camp} />
        ))}
      </div>

      <div className="flex items-center justify-center mt-5">
        <Link to="/available-camp">
          <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer">
            See All Camps
          </button>
        </Link>
      </div>

      {camps.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No popular camps found.
        </p>
      )}
    </div>
  );
};

export default PopularCamps;
