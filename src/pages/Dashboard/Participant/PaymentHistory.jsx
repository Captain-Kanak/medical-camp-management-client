import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = payments.slice(startIndex, endIndex);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Payment History
      </h2>
      {payments.length === 0 ? (
        <p className="text-center text-gray-500">
          No payment history available.
        </p>
      ) : (
        <div className="w-full">
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-700">
                  <th className="py-2 px-4 border border-gray-300 text-left">
                    #
                  </th>
                  <th className="py-2 px-4 border border-gray-300 text-left">
                    Camp Name
                  </th>
                  <th className="py-2 px-4 border border-gray-300 text-left">
                    Fees
                  </th>
                  <th className="py-2 px-4 border border-gray-300 text-left">
                    Payment Status
                  </th>
                  <th className="py-2 px-4 border border-gray-300 text-left">
                    Confirmation Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map((payment, index) => (
                  <tr key={payment._id} className="text-sm text-gray-800">
                    <td className="py-2 px-4 border border-gray-300">
                      {startIndex + index + 1}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      {payment.campName}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      ${payment.fees}
                    </td>
                    <td className="py-2 px-4 border border-gray-300 capitalize text-green-600 font-medium">
                      {payment.payment_status}
                    </td>
                    <td className="py-2 px-4 border border-gray-300 capitalize text-blue-600 font-medium">
                      {payment.confirmation_status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Version (Card View) */}
          <div className="block md:hidden space-y-4 mt-4">
            {currentPayments.map((payment, index) => (
              <div
                key={payment._id}
                className="border border-gray-300 rounded-md p-4 shadow-sm bg-white"
              >
                <p className="text-sm">
                  <span className="font-semibold">#:</span>{" "}
                  {startIndex + index + 1}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Camp Name:</span>{" "}
                  {payment.campName}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Fees:</span> ${payment.fees}
                </p>
                <p className="text-sm text-green-600 font-medium capitalize">
                  <span className="font-semibold text-gray-700">
                    Payment Status:
                  </span>{" "}
                  {payment.payment_status}
                </p>
                <p className="text-sm text-blue-600 font-medium capitalize">
                  <span className="font-semibold text-gray-700">
                    Confirmation Status:
                  </span>{" "}
                  {payment.confirmation_status}
                </p>
              </div>
            ))}
          </div>

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
                    : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
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
      )}
    </div>
  );
};

export default PaymentHistory;
