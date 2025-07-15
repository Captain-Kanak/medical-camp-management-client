import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const totalPages = Math.ceil(registeredCamps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCamps = registeredCamps.slice(startIndex, endIndex);

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Registered Camps</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-base-200 shadow-md rounded-md md:border md:border-gray-300">
          <thead className="hidden md:table-header-group bg-base-300">
            <tr className="text-left text-sm uppercase md:border-b md:border-gray-300">
              <th className="px-4 py-2 md:border-r md:border-gray-300">#</th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Camp Name
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">Fees</th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Participant
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Payment Status
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Confirmation Status
              </th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCamps.map((camp, index) => (
              <tr
                key={camp._id}
                className="text-sm block md:table-row border-b border-gray-300 md:border-none"
              >
                <td className="px-4 py-2 block border-l border-r border-gray-300 md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold"># </span>
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-2 block border-l border-r border-gray-300 md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">Camp Name: </span>
                  {camp.campName}
                </td>
                <td className="px-4 py-2 block border-l border-r border-gray-300 md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">Fees: </span>$
                  {camp.fees}
                </td>
                <td className="px-4 py-2 block border-l border-r border-gray-300 md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">Participant: </span>
                  {camp.name}
                </td>
                <td className="px-4 py-2 capitalize block border-l border-r border-gray-300 md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">
                    Payment Status:{" "}
                  </span>
                  {camp.payment_status || "unpaid"}
                </td>
                <td className="px-4 py-2 capitalize block border-l border-r border-gray-300 md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">
                    Confirmation:{" "}
                  </span>
                  {camp.confirmation_status || "pending"}
                </td>
                <td className="px-4 py-2 text-center block border-l border-r border-gray-300 md:table-cell md:border md:border-gray-300">
                  <button
                    onClick={() => handleCancel(camp._id, camp.campId)}
                    disabled={
                      camp.payment_status === "paid" ||
                      camp.confirmation_status === "confirmed"
                    }
                    className={`bg-red-500 text-white px-3 py-1 rounded mt-2 md:mt-0 ${
                      camp.payment_status === "paid" ||
                      camp.confirmation_status === "confirmed"
                        ? "opacity-50"
                        : "cursor-pointer"
                    }`}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {registeredCamps.length === 0 && (
              <tr className="block md:table-row">
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 block border-l border-r border-b border-gray-300 md:table-cell md:border-none"
                >
                  No registered camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-1 items-center flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === page + 1
                  ? "bg-blue-500 text-white cursor-pointer"
                  : "cursor-pointer"
              }`}
            >
              {page + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
