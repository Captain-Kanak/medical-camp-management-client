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
    <div className="p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <h2 className="text-2xl lg:text-4xl font-bold mb-5 text-center text-white drop-shadow-md">
        Manage Registered Camps
      </h2>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="🔍 Search by camp name, participant, or status"
      />

      {/* Responsive Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full backdrop-blur-md bg-white/20 text-white rounded-xl shadow-lg">
          <thead className="hidden md:table-header-group bg-white/30 text-sm uppercase font-semibold">
            <tr className="text-left text-sm uppercase md:border-b md:border-gray-300">
              <th className="px-4 py-2 md:border-r md:border-gray-300">#</th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Camp Name
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">Date</th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">Fees</th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Participant
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Payment
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Status
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {currentCamps.length > 0 ? (
              currentCamps.map((camp, index) => (
                <tr
                  key={camp._id}
                  className="text-sm block md:table-row border-b border-gray-300 md:border-none"
                >
                  {/* Index */}
                  <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                    <span className="md:hidden font-semibold"># </span>
                    {startIndex + index + 1}
                  </td>

                  {/* Name */}
                  <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                    <span className="md:hidden font-semibold">Camp Name: </span>
                    {camp.campName}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                    <span className="md:hidden font-semibold">Date: </span>
                    {new Date(camp.registered_at).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>

                  {/* Fees */}
                  <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                    <span className="md:hidden font-semibold">Fees: </span>$
                    {camp.fees}
                  </td>

                  {/* Name */}
                  <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                    <span className="md:hidden font-semibold">
                      Participant:{" "}
                    </span>
                    {camp.name}
                  </td>

                  <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                    <span className="md:hidden font-semibold">
                      Payment Status:{" "}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-xl text-xs font-semibold ${
                        camp.payment_status === "paid"
                          ? "bg-green-500/80"
                          : "bg-yellow-500/80"
                      }`}
                    >
                      {camp.payment_status || "unpaid"}
                    </span>
                  </td>

                  <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                    <span className="md:hidden font-semibold">
                      Confirmation Status:{" "}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-xl text-xs font-semibold ${
                        camp.confirmation_status === "confirmed"
                          ? "bg-blue-500/80"
                          : "bg-gray-500/80"
                      }`}
                    >
                      {camp.confirmation_status || "pending"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-2 block text-center md:table-cell md:border md:border-gray-300">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        onClick={() => handleCancel(camp._id, camp.campId)}
                        disabled={
                          camp.payment_status === "paid" ||
                          camp.confirmation_status === "confirmed"
                        }
                        className={`px-3 py-1 rounded-lg font-semibold text-white transition ${
                          camp.payment_status === "paid" ||
                          camp.confirmation_status === "confirmed"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 cursor-pointer"
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-white/70 font-medium"
                >
                  No registered camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
