import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner";
import SearchBar from "../../../components/SearchBar";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  const filteredPayments = payments.filter((payment) =>
    ["campName", "name", "payment_status", "confirmation_status"].some(
      (field) =>
        payment[field]
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = filteredPayments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-lg">
        Payment History
      </h2>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="🔍 Search by camp name, participant, or status"
      />

      {currentPayments.length === 0 ? (
        <p className="text-center text-white/80 text-lg mt-8">
          No payment history available.
        </p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full backdrop-blur-md bg-white/20 text-white shadow-lg rounded-md md:border md:border-gray-300">
            <thead className="hidden md:table-header-group bg-white/30">
              <tr className="text-left text-sm uppercase md:border-b md:border-gray-300">
                <th className="px-4 py-2 md:border-r md:border-gray-300">#</th>
                <th className="px-4 py-2 md:border-r md:border-gray-300">
                  Camp Name
                </th>
                <th className="px-4 py-2 md:border-r md:border-gray-300">
                  Date
                </th>
                <th className="px-4 py-2 md:border-r md:border-gray-300">
                  Fees
                </th>
                <th className="px-4 py-2 md:border-r md:border-gray-300">
                  Payment Status
                </th>
                <th className="px-4 py-2 md:border-r md:border-gray-300">
                  Confirmation
                </th>
              </tr>
            </thead>

            <tbody>
              {currentPayments.map((payment, index) => (
                <tr
                  key={payment._id}
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
                    {payment.campName}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                    <span className="md:hidden font-semibold">Date: </span>
                    {new Date(payment.paid_at).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>

                  {/* Fees */}
                  <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                    <span className="md:hidden font-semibold">Fees: </span>$
                    {payment.fees}
                  </td>

                  <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                    <span className="md:hidden font-semibold">
                      Payment Status:{" "}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.payment_status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.payment_status}
                    </span>
                  </td>

                  <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                    <span className="md:hidden font-semibold">
                      Confirmation Status:{" "}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.confirmation_status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.confirmation_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
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
                : "bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
