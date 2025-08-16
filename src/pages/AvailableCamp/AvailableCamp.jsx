import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Spinner from "../../components/Spinner";
import CampCard from "../../components/CampCard";

const AvailableCamp = () => {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const limit = 12;

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

  // Filter + Sort
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

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">Failed to load camps.</p>
    );

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
          Available Camps
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover our upcoming medical camps led by trusted healthcare
          professionals. Join a camp near you to promote better health and
          wellness in your community.
        </p>
        <div className="mt-4 h-1 w-20 mx-auto bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
      </div>

      {/* Search + Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="🔍 Search by keyword, location, or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full sm:w-1/2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered rounded-xl shadow-sm"
        >
          <option value="">Sort By</option>
          <option value="mostRegistered">Most Registered</option>
          <option value="fees">Camp Fees</option>
          <option value="alphabetical">Camp Name (A-Z)</option>
        </select>
      </div>

      {/* Camp Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredAndSortedCamps.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No camps found.
          </p>
        ) : (
          filteredAndSortedCamps.map((camp) => (
            <CampCard key={camp._id} camp={camp} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2 flex-wrap">
        <button
          className="btn btn-sm btn-outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn btn-sm ${
              page === num + 1
                ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                : "btn-outline"
            }`}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm btn-outline"
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
