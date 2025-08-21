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
  const itemsPerPage = 9;

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
      <h2 className="text-2xl lg:text-4xl font-bold mb-5 text-center text-white drop-shadow-md">
        My Registered Camps
      </h2>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="🔍 Search by camp name, participant, or status..."
      />

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full backdrop-blur-md bg-white/20 text-white shadow-lg rounded-md md:border md:border-gray-300">
          <thead className="hidden md:table-header-group bg-white/30">
            <tr className="text-left text-sm uppercase md:border-b md:border-gray-300">
              <th className="px-4 py-2 md:border-r md:border-gray-300">#</th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Camp Name
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">Date</th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">Fees</th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Payment
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Confirmation
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {currentCamps.map((camp, index) => (
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

                <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">
                    Payment Status:{" "}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      camp.payment_status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {camp.payment_status}
                  </span>
                </td>

                <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">
                    Confirmation Status:{" "}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      camp.confirmation_status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {camp.confirmation_status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-2 block text-center md:table-cell md:border md:border-gray-300">
                  <div className="flex sm:flex-row gap-2 justify-center">
                    {camp.payment_status === "paid" && (
                      <button
                        onClick={() => openFeedbackModal(camp.campId)}
                        className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
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
                      className={`px-3 py-1 rounded-lg transition ${
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
                      className={`px-3 py-1 rounded-lg transition ${
                        camp.payment_status === "paid"
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                      }`}
                    >
                      {camp.payment_status === "paid" ? "Paid" : "Pay Now"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {registeredCamps.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-white">
                  You haven’t registered for any camps yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
