import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Spinner from "../../components/Spinner";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const CampDetails = () => {
  const { user } = useAuth();
  const { campId } = useParams();
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    console.log("Form Data:", data);

    // Optional: send to backend
    const res = await axiosPublic.post("/camp-registration", {
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
    }

    reset();
    setIsModalOpen(false);
  };

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load camp details.
      </p>
    );

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">{camp.campName}</h2>

      <div className="flex flex-col lg:flex-row gap-6 bg-base-200 p-6 rounded-lg shadow-md">
        <div className="w-full lg:w-1/2">
          <img
            src={camp.image}
            alt={camp.campName}
            className="w-full h-64 object-cover rounded"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-between">
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

          <div className="mt-6">
            <button
              className="btn btn-primary w-full"
              onClick={() => setIsModalOpen(true)}
            >
              Join Camp
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-base-200 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Camp Description</h3>
        <p className="leading-relaxed">{camp.description}</p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-200 p-6 rounded-lg shadow-lg w-96 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-center">
              Thanks for joining
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Camp Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Camp Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={camp.campName || ""}
                  readOnly
                  {...register("campName")}
                  className="input input-bordered w-full cursor-not-allowed"
                />
                {errors.campName && (
                  <p className="text-red-500 text-sm">
                    {errors.campName.message}
                  </p>
                )}
              </div>

              {/* Camp Fees */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Camp Fees</span>
                </label>
                <input
                  type="number"
                  defaultValue={camp.fees || ""}
                  readOnly
                  {...register("fees")}
                  className="input input-bordered w-full cursor-not-allowed"
                />
                {errors.fees && (
                  <p className="text-red-500 text-sm">{errors.fees.message}</p>
                )}
              </div>

              {/* Camp Location */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Camp Location</span>
                </label>
                <input
                  type="text"
                  defaultValue={camp.location || ""}
                  readOnly
                  {...register("location")}
                  className="input input-bordered w-full cursor-not-allowed"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Healthcare Professional Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Healthcare Professional Name
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={camp.healthcareProfessional || ""}
                  readOnly
                  {...register("healthcareProfessional")}
                  className="input input-bordered w-full cursor-not-allowed"
                />
                {errors.healthcareProfessional && (
                  <p className="text-red-500 text-sm">
                    {errors.healthcareProfessional.message}
                  </p>
                )}
              </div>

              {/* Participant Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Participant Name
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName || ""}
                  readOnly
                  {...register("name")}
                  className="input input-bordered w-full cursor-not-allowed"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Participant Email */}
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
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Participant Age */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Age</span>
                </label>
                <input
                  type="number"
                  placeholder="Participant Age"
                  {...register("age", { required: "Age is required" })}
                  className="input input-bordered w-full"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">{errors.age.message}</p>
                )}
              </div>

              {/* Participant Phone Number */}
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

              {/* Participant Gender */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Gender</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="Male"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className="radio radio-sm"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="Female"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className="radio radio-sm"
                    />
                    <span>Female</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="Other"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className="radio radio-sm"
                    />
                    <span>Other</span>
                  </label>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Participant Emergency Contact */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Emergency Contact
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
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

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  className="btn btn-outline cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary cursor-pointer"
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

export default CampDetails;
