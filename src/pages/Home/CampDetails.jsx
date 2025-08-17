import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Spinner from "../../components/Spinner";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CampDetails = () => {
  const { user } = useAuth();
  const { campId } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: camp = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["camp", campId],
    enabled: !!campId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/camp-details/${campId}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/camp-registration", {
        ...data,
        campId,
      });

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Registered!",
          text: "You have successfully joined the camp.",
          confirmButtonColor: "#3085d6",
        });
        setIsModalOpen(false);
        navigate("/dashboard/registered-camps");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to register.", "error");
    }

    reset();
  };

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load camp details.
      </p>
    );

  return (
    <div className="px-4 lg:px-0 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl lg:text-4xl font-extrabold mb-8 text-center">
        {camp.campName}
      </h2>

      {/* Camp Info Card */}
      <div className="flex flex-col lg:flex-row gap-6 bg-base-200 rounded-xl shadow-lg">
        <div className="w-full lg:w-1/2">
          <img
            src={camp.image}
            alt={camp.campName}
            className="w-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-between p-4">
          <div className="space-y-2">
            <p>
              <strong>Location:</strong> {camp.location}
            </p>
            <p>
              <strong>Fees:</strong> ${camp.fees}
            </p>
            <p>
              <strong>Participants:</strong> {camp.participantCount}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(camp.datetime).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            <p>
              <strong>Healthcare Professional:</strong>{" "}
              {camp.healthcareProfessional}
            </p>
          </div>

          <button
            className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Join Camp
          </button>
        </div>
      </div>

      {/* Camp Description */}
      <div className="mt-8 bg-base-200 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold mb-2">Camp Description</h3>
        <p className="leading-relaxed">{camp.description}</p>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-200 p-6 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Register for Camp
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Read-only Camp Info */}
              {["campName", "fees", "location", "healthcareProfessional"].map(
                (field) => (
                  <div key={field}>
                    <label className="label">
                      <span className="label-text font-medium">
                        {field.replace(/([A-Z])/g, " $1")}
                      </span>
                    </label>
                    <input
                      type={field === "fees" ? "number" : "text"}
                      defaultValue={camp[field] || ""}
                      readOnly
                      {...register(field)}
                      className="input input-bordered w-full cursor-not-allowed"
                    />
                  </div>
                )
              )}

              {/* Participant Info */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Participant Name
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName || user?.name || ""}
                  readOnly
                  {...register("name")}
                  className="input input-bordered w-full cursor-not-allowed"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Participant Email
                  </span>
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || ""}
                  readOnly
                  {...register("email")}
                  className="input input-bordered w-full cursor-not-allowed"
                />
              </div>

              {/* Editable Fields */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Age</span>
                </label>
                <input
                  type="number"
                  placeholder="Your Age"
                  {...register("age", { required: "Age is required" })}
                  className="input input-bordered w-full"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">{errors.age.message}</p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                    minLength: {
                      value: 6,
                      message: "Phone number is too short",
                    },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Gender</span>
                </label>
                <div className="flex gap-4">
                  {["Male", "Female", "Other"].map((g) => (
                    <label key={g} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={g}
                        {...register("gender", {
                          required: "Gender is required",
                        })}
                        className="radio radio-sm"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Emergency Contact
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="Emergency Contact"
                  {...register("emergency_contact", {
                    required: "Emergency Contact is required",
                    minLength: {
                      value: 6,
                      message: "Emergency Contact is too short",
                    },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.emergency_contact && (
                  <p className="text-red-500 text-sm">
                    {errors.emergency_contact.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsModalOpen(false)}
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

export default CampDetails;
