import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner";
import SearchBar from "../../../components/SearchBar";

const RegisteredCamp = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: registeredCamps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registeredCamps", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/registered-camps?email=${user?.email}`
      );
      return data;
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
  const currentCamps = filteredCamps.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [currentCampId, setCurrentCampId] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const openFeedbackModal = (campId) => {
    setCurrentCampId(campId);
    setIsFeedbackOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackOpen(false);
    setCurrentCampId(null);
    reset();
  };

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
        Swal.fire(
          "🎉 Thank you!",
          "Your feedback has been submitted.",
          "success"
        );
        closeFeedbackModal();
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Failed to submit feedback", "error");
    }
  };

  const handleCancel = async (id, campId) => {
    const result = await Swal.fire({
      title: "Cancel Registration?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#e11d48",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axiosSecure.delete(
          `/cancel-registration/${id}?campId=${campId}`
        );
        if (data.deletedCount > 0) {
          Swal.fire("Cancelled", "Registration has been cancelled.", "success");
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

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <h2 className="text-4xl font-extrabold mb-8 text-white text-center drop-shadow-lg">
        My Registered Camps
      </h2>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="🔍 Search by camp name, participant, or status..."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {currentCamps.map((camp) => (
          <div
            key={camp._id}
            className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 flex flex-col justify-between shadow-2xl hover:shadow-3xl transition duration-300 border border-white/30"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white drop-shadow-md mb-2">
                {camp.campName}
              </h3>
              <p className="text-white/80 mb-1">
                <span className="font-medium">Participant:</span> {camp.name}
              </p>
              <p className="text-white/80 mb-1">
                <span className="font-medium">Fees:</span> ${camp.fees}
              </p>
              <p className="text-white/80 mb-1">
                <span className="font-medium">Payment:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    camp.payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {camp.payment_status}
                </span>
              </p>
              <p className="text-white/80">
                <span className="font-medium">Confirmation:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    camp.confirmation_status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {camp.confirmation_status}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {camp.payment_status === "paid" && (
                <button
                  onClick={() => openFeedbackModal(camp.campId)}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
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
                className={`px-4 py-2 rounded-lg transition ${
                  camp.payment_status === "paid" ||
                  camp.confirmation_status === "confirmed"
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => handlePay(camp._id)}
                disabled={camp.payment_status === "paid"}
                className={`px-4 py-2 rounded-lg transition ${
                  camp.payment_status === "paid"
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                }`}
              >
                {camp.payment_status === "paid" ? "Paid" : "Pay Now"}
              </button>
            </div>
          </div>
        ))}

        {registeredCamps.length === 0 && (
          <p className="text-center col-span-full text-white mt-6">
            You haven’t registered for any camps yet.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-3 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-indigo-500 text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-indigo-600 transition cursor-pointer"
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentPage === page + 1
                ? "bg-indigo-600 text-white"
                : "bg-white/30 text-white hover:bg-white/50"
            } transition`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-indigo-500 text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-indigo-600 transition cursor-pointer"
        >
          Next
        </button>
      </div>

      {/* Feedback Modal */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-white text-center drop-shadow-md">
              Submit Feedback
            </h3>
            <form
              onSubmit={handleSubmit(onSubmitFeedback)}
              className="space-y-4"
            >
              <textarea
                {...register("feedback", { required: true })}
                placeholder="Write your feedback..."
                rows={4}
                className="w-full rounded-lg p-3 text-white border border-white/30 focus:ring-2 focus:ring-indigo-300"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeFeedbackModal}
                  className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition cursor-pointer"
                >
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
