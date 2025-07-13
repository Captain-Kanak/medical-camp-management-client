import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RegisteredCamp = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: registeredCamps = [], refetch } = useQuery({
    queryKey: ["registeredCamps", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/registered-camps?email=${user?.email}`
      );
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

  const handlePay = (campId) => {
    navigate(`/dashboard/payment/${campId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        My Registered Camps
      </h2>
      <div className="overflow-x-auto border border-gray-200">
        <table className="table w-full text-sm md:text-base">
          <thead className="bg-base-200 text-left">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Camp Name</th>
              <th className="px-4 py-2 border">Fees</th>
              <th className="px-4 py-2 border">Participant</th>
              <th className="px-4 py-2 border">Payment</th>
              <th className="px-4 py-2 border">Confirmation</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registeredCamps.map((camp, index) => (
              <tr key={camp._id} className="hover">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{camp.campName}</td>
                <td className="px-4 py-2 border">${camp.fees}</td>
                <td className="px-4 py-2 border">{camp.name}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`badge ${
                      camp.payment_status === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {camp.payment_status}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  <span
                    className={`badge ${
                      camp.confirmation_status === "confirmed"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {camp.confirmation_status}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    {camp.payment_status === "paid" && (
                      <button
                        onClick={() =>
                          alert("Feedback functionality not implemented yet")
                        }
                        className="btn btn-xs btn-info"
                      >
                        Feedback
                      </button>
                    )}
                    <button
                      onClick={() => handleCancel(camp._id, camp.campId)}
                      disabled={
                        camp.payment_status === "paid" ||
                        camp.confirmation_status === "confirmed"
                      }
                      className={`btn btn-xs ${
                        camp.payment_status === "paid" ||
                        camp.confirmation_status === "confirmed"
                          ? "btn-disabled bg-gray-300 text-gray-600"
                          : "btn-error cursor-pointer"
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handlePay(camp._id)}
                      className={`btn btn-xs ${
                        camp.payment_status === "paid"
                          ? "btn-disabled bg-gray-300 text-gray-600"
                          : "btn-success"
                      }`}
                      disabled={camp.payment_status === "paid"}
                    >
                      {camp.payment_status === "paid" ? "Paid" : "Pay"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {registeredCamps.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  You haven’t registered for any camps yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredCamp;
