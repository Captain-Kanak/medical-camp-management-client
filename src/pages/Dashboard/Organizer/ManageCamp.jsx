import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [campImage, setCampImage] = useState("");
  const [editingCamp, setEditingCamp] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { data: camps = [], refetch } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camps");
      return res.data;
    },
  });

  console.log(camps);

  const handleEdit = (camp) => {
    setEditingCamp(camp);
    setCampImage(camp.image || "");
    reset({
      campName: camp.campName,
      datetime: new Date(camp.datetime),
      location: camp.location,
      healthcareProfessional: camp.healthcareProfessional,
      fees: camp.fees,
      description: camp.description,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/delete-camp/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Camp has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error!", error.message, "error");
      }
    }
  };

  const onSubmit = async (data) => {
    if (!campImage) {
      return Swal.fire(
        "Missing Image",
        "Please upload a camp image.",
        "warning"
      );
    }

    const updateCamp = {
      ...data,
      image: campImage,
    };

    try {
      const res = await axiosSecure.put(
        `/update-camp/${editingCamp._id}`,
        updateCamp
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Camp updated successfully", "success");
        refetch();
        setIsModalOpen(false);
        setEditingCamp(null);
      }
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    try {
      setUploading(true);
      const res = await axios.post(imageUploadUrl, formData);
      const url = res.data?.data?.url;
      if (url) {
        setCampImage(url);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      Swal.fire("Upload Error", "Image upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Manage Medical Camps</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-base-200 border border-gray-200 shadow-md rounded-md">
          <thead>
            <tr className="text-left text-sm uppercase">
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Date & Time</th>
              <th className="px-4 py-2 border-b">Location</th>
              <th className="px-4 py-2 border-b">Healthcare Professional</th>
              <th className="px-4 py-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={camp._id} className="text-sm">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{camp.campName}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(camp.datetime).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-4 py-2 border-b">{camp.location}</td>
                <td className="px-4 py-2 border-b">
                  {camp.healthcareProfessional}
                </td>
                <td className="px-4 py-2 border-b text-center space-x-2 space-y-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                    onClick={() => handleEdit(camp)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(camp._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {camps.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-base-200 bg-opacity-40 z-50 p-4 overflow-y-auto">
          <div className="bg-base-300 p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Edit Camp</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Camp Name */}
              <div>
                <label
                  htmlFor="campName"
                  className="block text-sm font-medium mb-1"
                >
                  Camp Name
                </label>
                <input
                  id="campName"
                  type="text"
                  {...register("campName", {
                    required: "Camp name is required",
                  })}
                  className="w-full input input-bordered"
                  placeholder="Enter camp name"
                />
                {errors.campName && (
                  <p className="text-red-500 text-sm">
                    {errors.campName.message}
                  </p>
                )}
              </div>

              {/* Camp Image Upload */}
              <div>
                <label
                  htmlFor="campImage"
                  className="block text-sm font-medium mb-1"
                >
                  Upload Camp Image
                </label>
                <input
                  id="campImage"
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full file-input file-input-bordered"
                />
                {uploading && (
                  <p className="text-yellow-600 text-sm">Uploading...</p>
                )}
              </div>

              {/* Camp Fees */}
              <div>
                <label
                  htmlFor="fees"
                  className="block text-sm font-medium mb-1"
                >
                  Camp Fees ($)
                </label>
                <input
                  id="fees"
                  type="number"
                  {...register("fees", {
                    required: "Fees are required",
                    min: 0,
                  })}
                  className="w-full input input-bordered"
                  placeholder="Enter camp fees"
                />
                {errors.fees && (
                  <p className="text-red-500 text-sm">{errors.fees.message}</p>
                )}
              </div>

              {/* Date and Time */}
              <div>
                <label
                  htmlFor="datetime"
                  className="block text-sm font-medium mb-1"
                >
                  Date & Time
                </label>
                <Controller
                  control={control}
                  name="datetime"
                  rules={{ required: "Date & time is required" }}
                  render={({ field }) => (
                    <DatePicker
                      id="datetime"
                      selected={field.value}
                      onChange={field.onChange}
                      showTimeSelect
                      dateFormat="Pp"
                      placeholderText="Select date and time"
                      className="w-full input input-bordered"
                    />
                  )}
                />
                {errors.datetime && (
                  <p className="text-red-500 text-sm">
                    {errors.datetime.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium mb-1"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className="w-full input input-bordered"
                  placeholder="Enter location"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Healthcare Professional */}
              <div>
                <label
                  htmlFor="healthcareProfessional"
                  className="block text-sm font-medium mb-1"
                >
                  Healthcare Professional
                </label>
                <input
                  id="healthcareProfessional"
                  type="text"
                  {...register("healthcareProfessional", {
                    required: "Professional name is required",
                  })}
                  className="w-full input input-bordered"
                  placeholder="Enter healthcare professional"
                />
                {errors.healthcareProfessional && (
                  <p className="text-red-500 text-sm">
                    {errors.healthcareProfessional.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full textarea textarea-bordered"
                  rows="4"
                  placeholder="Enter description"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="btn btn-primary cursor-pointer"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCamp;
