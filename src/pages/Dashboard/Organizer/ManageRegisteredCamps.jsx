import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";
import SearchBar from "../../../components/SearchBar";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const {
    data: registeredCamps = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["registeredCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camps-registered");
      return res.data;
    },
  });

  const filteredCamps = registeredCamps.filter((camp) =>
    ["campName", "name", "payment_status", "confirmation_status"].some(
      (field) =>
        camp[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCamps = filteredCamps.slice(startIndex, endIndex);

  const handleCancel = async (id, campId) => {
    const result = await Swal.fire({
      title: "Cancel Registration?",
      text: "Are you sure you want to cancel this registration?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(
          `/cancel-registration/${id}?campId=${campId}`
        );
        if (res.data.deletedCount > 0) {
          Swal.fire(
            "Cancelled!",
            "Registration has been cancelled.",
            "success"
          );
          refetch();
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-white text-center drop-shadow-lg">
        Manage Registered Camps
      </h2>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by camp name, participant, or status"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {currentCamps.length > 0 ? (
          currentCamps.map((camp) => (
            <div
              key={camp._id}
              className="bg-white/20 backdrop-blur-md rounded-xl p-5 shadow-lg text-white flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{camp.campName}</h3>
                <p className="text-sm">
                  <span className="font-semibold">Participant:</span>{" "}
                  {camp.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Fees:</span> ${camp.fees}
                </p>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Payment:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-xl text-xs font-semibold ${
                      camp.payment_status === "paid"
                        ? "bg-green-500/80"
                        : "bg-yellow-500/80"
                    }`}
                  >
                    {camp.payment_status || "unpaid"}
                  </span>
                </p>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-xl text-xs font-semibold ${
                      camp.confirmation_status === "confirmed"
                        ? "bg-blue-500/80"
                        : "bg-gray-500/80"
                    }`}
                  >
                    {camp.confirmation_status || "pending"}
                  </span>
                </p>
              </div>

              <button
                onClick={() => handleCancel(camp._id, camp.campId)}
                disabled={
                  camp.payment_status === "paid" ||
                  camp.confirmation_status === "confirmed"
                }
                className={`mt-4 w-full px-3 py-2 rounded-lg font-semibold text-white transition ${
                  camp.payment_status === "paid" ||
                  camp.confirmation_status === "confirmed"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 cursor-pointer"
                }`}
              >
                Cancel
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-white/70 text-lg font-medium">
            No registered camps found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
          }`}
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`px-3 py-1 rounded cursor-pointer ${
              currentPage === page + 1
                ? "bg-indigo-600 text-white"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
