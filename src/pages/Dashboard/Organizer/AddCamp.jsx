import axios from "axios";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddCamp = () => {
  const [uploading, setUploading] = useState(false);
  const [campImage, setCampImage] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const campData = {
      ...data,
      datetime: data.datetime.toISOString(),
      image: campImage,
      participantCount: 0,
    };

    try {
      const res = await axiosSecure.post("/camps", campData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Camp Added Successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        setCampImage("");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add camp.", "error");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-5xl w-full p-4 lg:p-10 rounded-3xl bg-white/20 backdrop-blur-lg shadow-2xl border border-white/30">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-10 text-center text-white drop-shadow-xl">
          Add A New Camp
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Camp Name */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Camp Name
            </label>
            <input
              type="text"
              {...register("campName", { required: "Camp name is required" })}
              className="w-full px-4 py-3 rounded-xl bg-indigo-500/30 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-indigo-300 transition shadow-md"
              placeholder="Enter camp name"
            />
            {errors.campName && (
              <p className="text-red-300 text-sm mt-1">
                {errors.campName.message}
              </p>
            )}
          </div>

          {/* Camp Fees */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Camp Fees ($)
            </label>
            <input
              type="number"
              {...register("fees", {
                required: "Camp fees are required",
                min: 0,
              })}
              className="w-full px-4 py-3 rounded-xl bg-indigo-500/30 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-indigo-300 transition shadow-md"
              placeholder="Enter camp fees"
            />
            {errors.fees && (
              <p className="text-red-300 text-sm mt-1">{errors.fees.message}</p>
            )}
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Date & Time
            </label>
            <Controller
              name="datetime"
              control={control}
              rules={{ required: "Date and time is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  dateFormat="Pp"
                  placeholderText="Select date and time"
                  className="w-full px-4 py-3 rounded-xl bg-indigo-500/30 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-indigo-300 transition shadow-md"
                />
              )}
            />
            {errors.datetime && (
              <p className="text-red-300 text-sm mt-1">
                {errors.datetime.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Location
            </label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="w-full px-4 py-3 rounded-xl bg-indigo-500/30 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-indigo-300 transition shadow-md"
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="text-red-300 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Healthcare Professional */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Healthcare Professional
            </label>
            <input
              type="text"
              {...register("healthcareProfessional", {
                required: "Professional name is required",
              })}
              className="w-full px-4 py-3 rounded-xl bg-indigo-500/30 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-indigo-300 transition shadow-md"
              placeholder="Enter professional name"
            />
            {errors.healthcareProfessional && (
              <p className="text-red-300 text-sm mt-1">
                {errors.healthcareProfessional.message}
              </p>
            )}
          </div>

          {/* Camp Image (Full Width) */}
          <div className="lg:col-span-2">
            <label className="block text-white font-semibold mb-1">
              Upload Camp Image
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="file-input file-input-bordered bg-indigo-500/30 border-white/30 text-white"
            />
            {uploading && (
              <p className="text-yellow-200 mt-1">Uploading image...</p>
            )}
            {campImage && (
              <img
                src={campImage}
                alt="Preview"
                className="mt-3 rounded-xl shadow-lg w-48 h-48 object-cover border border-white/40"
              />
            )}
          </div>

          {/* Description (Full Width) */}
          <div className="lg:col-span-2">
            <label className="block text-white font-semibold mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-4 py-3 rounded-xl bg-indigo-500/30 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-indigo-300 transition shadow-md"
              rows="4"
              placeholder="Enter camp description"
            />
            {errors.description && (
              <p className="text-red-300 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button (Full Width) */}
          <div className="lg:col-span-2 text-center">
            <button
              type="submit"
              disabled={uploading}
              className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              Add Camp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCamp;
