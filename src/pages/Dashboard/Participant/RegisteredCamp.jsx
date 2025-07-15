import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RegisteredCamp = () => {
  /* ------------------------------------------------------------------ */
  /*                           hooks & state                            */
  /* ------------------------------------------------------------------ */
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // fetch the user’s registered camps
  const { data: registeredCamps = [], refetch } = useQuery({
    queryKey: ["registeredCamps", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/registered-camps?email=${user?.email}`
      );
      return data;
    },
  });

  // feedback‑modal state
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [currentCampId, setCurrentCampId] = useState(null);

  // react‑hook‑form for feedback
  const { register, handleSubmit, reset } = useForm();

  /* ------------------------------------------------------------------ */
  /*                           event handlers                           */
  /* ------------------------------------------------------------------ */
  const openFeedbackModal = (campId) => {
    setCurrentCampId(campId);
    setIsFeedbackOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackOpen(false);
    setCurrentCampId(null);
    reset();
  };

  // submit feedback to backend
  const onSubmitFeedback = async (data) => {
    const payload = {
      feedback: data.feedback,
      campId: currentCampId,
      name: user.displayName,
      email: user?.email,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/feedbacks", payload);
      if (res.data.insertedId) {
        Swal.fire("Thank you!", "Your feedback has been submitted.", "success");
        closeFeedbackModal();
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Failed to submit feedback", "error");
    }
  };

  // cancel registration
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
        const { data } = await axiosSecure.delete(
          `/cancel-registration/${id}?campId=${campId}`
        );
        if (data.deletedCount > 0) {
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

  // pay fees
  const handlePay = (campId) => {
    navigate(`/dashboard/payment/${campId}`);
  };

  /* ------------------------------------------------------------------ */
  /*                               render                               */
  /* ------------------------------------------------------------------ */
  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        My Registered Camps
      </h2>

      {/* ------------------- camps table ------------------- */}
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
                    {/* Feedback button (only visible if paid) */}
                    {camp.payment_status === "paid" && (
                      <button
                        onClick={() => openFeedbackModal(camp.campId)}
                        className="btn btn-xs btn-info"
                      >
                        Feedback
                      </button>
                    )}

                    {/* Cancel button */}
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

                    {/* Pay button */}
                    <button
                      onClick={() => handlePay(camp._id)}
                      disabled={camp.payment_status === "paid"}
                      className={`btn btn-xs ${
                        camp.payment_status === "paid"
                          ? "btn-disabled bg-gray-300 text-gray-600"
                          : "btn-success"
                      }`}
                    >
                      {camp.payment_status === "paid" ? "Paid" : "Pay"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* empty‑state row */}
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

      {/* ------------------- feedback modal ------------------- */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Submit Feedback</h3>

            <form
              onSubmit={handleSubmit(onSubmitFeedback)}
              className="space-y-4"
            >
              <textarea
                {...register("feedback", { required: true })}
                placeholder="Your Feedback"
                rows={4}
                className="textarea textarea-bordered w-full"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeFeedbackModal}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredCamp;
