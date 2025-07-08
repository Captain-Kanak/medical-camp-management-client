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
    <div className="max-w-3xl mx-auto my-10 p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Add A Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Camp Name */}
        <div>
          <label className="block text-sm font-medium">Camp Name</label>
          <input
            type="text"
            {...register("campName", { required: "Camp name is required" })}
            className="w-full input input-bordered mt-1"
            placeholder="Enter camp name"
          />
          {errors.campName && (
            <p className="text-red-500 text-sm">{errors.campName.message}</p>
          )}
        </div>

        {/* Camp Image */}
        <div>
          <label className="block text-sm font-medium">Upload Camp Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full file-input file-input-bordered mt-1"
          />
          {uploading && <p className="text-sm text-yellow-600">Uploading...</p>}
        </div>

        {/* Camp Fees */}
        <div>
          <label className="block text-sm font-medium">Camp Fees ($)</label>
          <input
            type="number"
            {...register("fees", {
              required: "Camp fees are required",
              min: 0,
            })}
            className="w-full input input-bordered mt-1"
            placeholder="Enter camp fees"
          />
          {errors.fees && (
            <p className="text-red-500 text-sm">{errors.fees.message}</p>
          )}
        </div>

        {/* Date & Time */}
        <div>
          <label className="block text-sm font-medium">Date & Time</label>
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
                className="w-full input input-bordered mt-1"
              />
            )}
          />
          {errors.datetime && (
            <p className="text-red-500 text-sm">{errors.datetime.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full input input-bordered mt-1"
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Healthcare Professional */}
        <div>
          <label className="block text-sm font-medium">
            Healthcare Professional
          </label>
          <input
            type="text"
            {...register("healthcareProfessional", {
              required: "Professional name is required",
            })}
            className="w-full input input-bordered mt-1"
            placeholder="Enter professional name"
          />
          {errors.healthcareProfessional && (
            <p className="text-red-500 text-sm">
              {errors.healthcareProfessional.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full textarea textarea-bordered mt-1"
            rows="4"
            placeholder="Enter camp description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary px-6 py-2 rounded-md"
            disabled={uploading}
          >
            {uploading ? "Submitting..." : "Add Camp"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCamp;
