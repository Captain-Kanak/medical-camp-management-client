import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner";
import SearchBar from "../../../components/SearchBar";

const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [campImage, setCampImage] = useState("");
  const [editingCamp, setEditingCamp] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const {
    data: camps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camps");
      return res.data;
    },
  });

  const filteredCamps = camps.filter((camp) =>
    ["campName", "name", "payment_status", "confirmation_status"].some(
      (field) =>
        camp[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCamps = filteredCamps.slice(startIndex, endIndex);

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
    if (!campImage)
      return Swal.fire(
        "Missing Image",
        "Please upload a camp image.",
        "warning"
      );

    const updateCamp = { ...data, image: campImage };

    try {
      const res = await axiosSecure.patch(
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
      if (url) setCampImage(url);
    } catch (error) {
      console.error("Image upload failed:", error);
      Swal.fire("Upload Error", "Image upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <h2 className="text-2xl lg:text-4xl font-bold mb-5 text-center text-white drop-shadow-md">
        Manage Camps
      </h2>

      {/* Search */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="🔍 Search by camp name, location, or professional"
      />

      {/* Responsive Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full backdrop-blur-md bg-white/20 text-white shadow-lg rounded-md md:border md:border-gray-300">
          <thead className="hidden md:table-header-group bg-white/30">
            <tr className="text-left text-sm uppercase md:border-b md:border-gray-300">
              <th className="px-4 py-2 md:border-r md:border-gray-300">#</th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Image
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Camp Name
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">Date</th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Location
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Professional
              </th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">Fees</th>
              <th className="px-4 py-2 md:border-r md:border-gray-300">
                Action
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

                {/* Image */}
                <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">Image: </span>
                  <img
                    src={camp.image || "https://via.placeholder.com/80"}
                    alt={camp.campName}
                    className="w-16 h-12 object-cover rounded-md"
                  />
                </td>

                {/* Name */}
                <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">Camp Name: </span>
                  {camp.campName}
                </td>

                {/* Date */}
                <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">Date: </span>
                  {new Date(camp.datetime).toLocaleDateString()}
                </td>

                {/* Location */}
                <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">Location: </span>
                  {camp.location}
                </td>

                {/* Professional */}
                <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">
                    Professional:{" "}
                  </span>
                  {camp.healthcareProfessional}
                </td>

                {/* Fees */}
                <td className="px-4 py-2 block md:table-cell md:border md:border-gray-300">
                  <span className="md:hidden font-semibold">Fees: </span>$
                  {camp.fees}
                </td>

                {/* Actions */}
                <td className="px-4 py-2 block text-center md:table-cell md:border md:border-gray-300">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(camp)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(camp._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {currentCamps.length === 0 && (
              <tr className="block md:table-row">
                <td
                  colSpan="8"
                  className="text-center py-4 text-gray-500 block border-b border-gray-300 md:table-cell md:border-none"
                >
                  No camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded font-semibold ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`px-4 py-2 rounded font-semibold cursor-pointer ${
              currentPage === page + 1
                ? "bg-indigo-500 text-white"
                : "bg-indigo-200 text-gray-700 hover:bg-indigo-500 hover:text-white"
            }`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded font-semibold ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal (Edit Camp) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Camp</h3>
            {/* You can reuse your edit form here */}
          </div>
        </div>
      )}

      {/* Modal (Edit Camp) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-black rounded-xl shadow-lg p-6 w-full max-w-md overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Camp</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Camp Name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Camp Name
                </label>
                <input
                  {...register("campName", {
                    required: "Camp name is required",
                  })}
                  type="text"
                  className="w-full input input-bordered bg-indigo-500/30 text-white placeholder-white/70 border-white/40"
                />
                {errors.campName && (
                  <p className="text-red-300 text-sm">
                    {errors.campName.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Upload Camp Image
                </label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full file-input file-input-bordered bg-indigo-500/30 border-white/40 text-white"
                />
                {uploading && (
                  <p className="text-yellow-200 text-sm">Uploading...</p>
                )}
              </div>

              {/* Fees */}
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Fees ($)
                </label>
                <input
                  {...register("fees", {
                    required: "Fees are required",
                    min: 0,
                  })}
                  type="number"
                  className="w-full input input-bordered bg-indigo-500/30 text-white border-white/40"
                />
                {errors.fees && (
                  <p className="text-red-300 text-sm">{errors.fees.message}</p>
                )}
              </div>

              {/* Date & Time */}
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Date & Time
                </label>
                <Controller
                  control={control}
                  name="datetime"
                  rules={{ required: "Date & time is required" }}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      showTimeSelect
                      dateFormat="Pp"
                      className="w-full input input-bordered bg-indigo-500/30 text-white border-white/40"
                    />
                  )}
                />
                {errors.datetime && (
                  <p className="text-red-300 text-sm">
                    {errors.datetime.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Location
                </label>
                <input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  type="text"
                  className="w-full input input-bordered bg-indigo-500/30 text-white border-white/40"
                />
                {errors.location && (
                  <p className="text-red-300 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Healthcare Professional */}
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Healthcare Professional
                </label>
                <input
                  {...register("healthcareProfessional", {
                    required: "Professional name is required",
                  })}
                  type="text"
                  className="w-full input input-bordered bg-indigo-500/30 text-white border-white/40"
                />
                {errors.healthcareProfessional && (
                  <p className="text-red-300 text-sm">
                    {errors.healthcareProfessional.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows="4"
                  className="w-full textarea textarea-bordered bg-indigo-500/30 text-white border-white/40"
                ></textarea>
                {errors.description && (
                  <p className="text-red-300 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition cursor-pointer"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white font-semibold transition cursor-pointer"
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
