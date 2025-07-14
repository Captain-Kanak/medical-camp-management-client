import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading payment history...</p>;
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
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-700">
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
              {payments.map((payment) => (
                <tr key={payment._id} className="text-sm text-gray-800">
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
      )}
    </div>
  );
};

export default PaymentHistory;
