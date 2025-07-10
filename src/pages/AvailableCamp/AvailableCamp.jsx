import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router";
import { HiViewColumns } from "react-icons/hi2";
import { HiViewGrid } from "react-icons/hi";

const AvailableCamp = () => {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isThreeColumn, setIsThreeColumn] = useState(true);
  const limit = 9;

  const {
    data: campsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["availableCamps", page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/camps/paginated?page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const { camps = [], totalPages } = campsData;

  // Filtered + Sorted Camps
  const filteredAndSortedCamps = useMemo(() => {
    let filtered = camps.filter((camp) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        camp.campName.toLowerCase().includes(lowerSearch) ||
        camp.location.toLowerCase().includes(lowerSearch) ||
        camp.healthcareProfessional.toLowerCase().includes(lowerSearch) ||
        new Date(camp.datetime).toLocaleDateString().includes(lowerSearch)
      );
    });

    switch (sortBy) {
      case "mostRegistered":
        filtered.sort((a, b) => b.participantCount - a.participantCount);
        break;
      case "fees":
        filtered.sort((a, b) => a.fees - b.fees);
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.campName.localeCompare(b.campName));
        break;
      default:
        break;
    }

    return filtered;
  }, [camps, searchTerm, sortBy]);

  if (isLoading) return <p className="text-center py-10">Loading camps...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">Failed to load camps.</p>
    );

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Available Camps</h2>
      <p className="text-center max-w-2xl mx-auto mb-6">
        Explore our curated selection of upcoming medical camps designed to
        promote better health and wellness in your community. Each camp is led
        by trusted healthcare professionals and offers accessible services
        across various locations.
      </p>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by keyword, location, or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full sm:w-1/2"
        />

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Sort By</option>
            <option value="mostRegistered">Most Registered</option>
            <option value="fees">Camp Fees</option>
            <option value="alphabetical">Camp Name (A-Z)</option>
          </select>

          <button
            className="btn btn-outline flex items-center gap-2"
            onClick={() => setIsThreeColumn((prev) => !prev)}
          >
            {isThreeColumn ? (
              <>
                <HiViewGrid className="text-lg" />2 Column View
              </>
            ) : (
              <>
                <HiViewColumns className="text-lg" />3 Column View
              </>
            )}
          </button>
        </div>
      </div>

      {/* Camp Cards */}
      <div
        className={`grid gap-6 ${
          isThreeColumn
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {filteredAndSortedCamps.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No camps found.
          </p>
        ) : (
          filteredAndSortedCamps.map((camp) => (
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
                  <h3 className="text-xl font-semibold mb-1">
                    {camp.campName}
                  </h3>
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
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn btn-sm ${page === num + 1 ? "btn-active" : ""}`}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AvailableCamp;
