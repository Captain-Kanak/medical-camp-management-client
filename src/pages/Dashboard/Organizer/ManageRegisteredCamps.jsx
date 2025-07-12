import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();

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
        <table className="min-w-full bg-base-200 border border-gray-300 shadow-md rounded-md">
          <thead className="hidden md:table-header-group bg-base-300">
            <tr className="text-left text-sm uppercase border-b border-gray-300">
              <th className="px-4 py-2 border-r border-gray-300">#</th>
              <th className="px-4 py-2 border-r border-gray-300">Camp Name</th>
              <th className="px-4 py-2 border-r border-gray-300">Fees</th>
              <th className="px-4 py-2 border-r border-gray-300">
                Participant
              </th>
              <th className="px-4 py-2 border-r border-gray-300">
                Payment Status
              </th>
              <th className="px-4 py-2 border-r border-gray-300">
                Confirmation Status
              </th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {registeredCamps.map((camp, index) => (
              <tr
                key={camp._id}
                className="text-sm block md:table-row border-b md:border-none border-gray-300"
              >
                <td className="px-4 py-2 border-b border-gray-300 md:border md:border-gray-300 block md:table-cell">
                  <span className="md:hidden font-semibold"># </span>
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 md:border md:border-gray-300 block md:table-cell">
                  <span className="md:hidden font-semibold">Camp Name: </span>
                  {camp.campName}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 md:border md:border-gray-300 block md:table-cell">
                  <span className="md:hidden font-semibold">Fees: </span>$
                  {camp.fees}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 md:border md:border-gray-300 block md:table-cell">
                  <span className="md:hidden font-semibold">Participant: </span>
                  {camp.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 md:border md:border-gray-300 block md:table-cell capitalize">
                  <span className="md:hidden font-semibold">
                    Payment Status:{" "}
                  </span>
                  {camp.payment_status || "unpaid"}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 md:border md:border-gray-300 block md:table-cell capitalize">
                  <span className="md:hidden font-semibold">
                    Confirmation:{" "}
                  </span>
                  {camp.confirmation_status || "pending"}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 md:border md:border-gray-300 block md:table-cell text-center">
                  <button
                    onClick={() => handleCancel(camp._id, camp.campId)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-2 md:mt-0 cursor-pointer"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {registeredCamps.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No registered camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
