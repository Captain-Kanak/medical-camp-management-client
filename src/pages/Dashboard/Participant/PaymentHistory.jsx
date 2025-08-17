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
        placeholder="Search by camp name, participant, or status"
      />

      {currentPayments.length === 0 ? (
        <p className="text-center text-white/80 text-lg mt-8">
          No payment history available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {currentPayments.map((payment, index) => (
            <div
              key={payment._id}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 shadow-2xl border border-white/30 flex flex-col gap-2 transition-transform hover:scale-105"
            >
              <p className="text-white/90 font-semibold">
                #{startIndex + index + 1} - {payment.campName}
              </p>
              <p className="text-white/80">
                <span className="font-semibold">Participant:</span>{" "}
                {payment.name}
              </p>
              <p className="text-white/80">
                <span className="font-semibold">Fees:</span> ${payment.fees}
              </p>
              <p>
                <span
                  className="px-2 py-1 rounded-full text-sm font-semibold mr-2
                  text-white 
                  bg-green-500/80"
                >
                  {payment.payment_status}
                </span>
                <span
                  className="px-2 py-1 rounded-full text-sm font-semibold
                  text-white 
                  bg-blue-500/80"
                >
                  {payment.confirmation_status}
                </span>
              </p>
            </div>
          ))}
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
