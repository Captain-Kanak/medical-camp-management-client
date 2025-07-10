import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router";

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

  if (isLoading)
    return <p className="text-center py-10">Loading popular camps...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load popular camps.
      </p>
    );

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Popular Medical Camps
      </h2>
      <p className="text-center max-w-2xl mx-auto mb-6">
        Discover our most popular medical camps based on participant interest.
        These top-rated camps offer quality healthcare services at various
        locations and are trusted by our community.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <div
            key={camp._id}
            className="border shadow rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={camp.image}
              alt={camp.campName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-1">{camp.campName}</h3>
                <p className="text-sm">
                  <strong>Location:</strong> {camp.location}
                </p>
                <p className="text-sm">
                  <strong>Fees:</strong> ${camp.fees}
                </p>
                <p className="text-sm">
                  <strong>Participants:</strong> {camp.participantCount}
                </p>
                <p className="text-sm">
                  <strong>Date:</strong>{" "}
                  {new Date(camp.datetime).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <Link to={`/camp-details/${camp._id}`}>
                <button className="btn btn-info mt-4 w-full text-white">
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center my-5">
        <Link to="/available-camp">
          <button className="btn btn-primary">See All</button>
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
