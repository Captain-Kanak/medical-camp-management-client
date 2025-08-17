import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import userImage from "../../assets/user.jpg";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const photoURL = profilePic || user?.photoURL;
    const userProfile = { displayName: data.name, photoURL };

    try {
      await updateUserProfile(userProfile);
      const userInfo = { email: data.email, name: data.name, photo: photoURL };
      const res = await axiosPublic.patch("/users/profile-update", userInfo);

      if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const openModal = () => {
    reset({ name: user?.displayName || "", email: user?.email || "" });
    setProfilePic("");
    setIsModalOpen(true);
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
      if (url) setProfilePic(url);
    } catch (error) {
      console.error("Image upload failed:", error);
      Swal.fire("Upload Error", "Image upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <h2 className="text-4xl font-extrabold mb-10 text-white drop-shadow-xl text-center">
        Your Profile
      </h2>

      {/* Profile Card */}
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 flex flex-col items-center gap-4 w-full max-w-md border border-white/30">
        <div className="relative group">
          <img
            src={user?.photoURL || userImage}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-400/60 shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
        </div>

        <h3 className="text-2xl font-semibold text-white drop-shadow-md">
          {user?.displayName}
        </h3>
        <p className="text-white/80">{user?.email}</p>

        <button
          className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={openModal}
        >
          Update Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="rounded-2xl bg-white/20 backdrop-blur-xl shadow-2xl w-full max-w-md p-6 relative border border-white/30 transform transition-transform duration-300 scale-100">
            <h3 className="text-2xl font-bold mb-5 text-center text-white drop-shadow-md">
              Update Profile
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-indigo-500/30 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-indigo-300 transition shadow-md"
                />
                {errors.name && (
                  <p className="text-red-300 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Upload Photo
                </label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="file-input file-input-bordered w-full bg-indigo-500/30 border-white/30 text-white"
                />
                {uploading && (
                  <p className="text-yellow-200 text-sm mt-1">Uploading...</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Email (read-only)
                </label>
                <input
                  {...register("email")}
                  type="email"
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-400 text-white font-semibold transition cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className={`px-4 py-2 rounded-full text-white font-semibold transition transform ${
                    uploading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 cursor-pointer"
                  }`}
                >
                  {uploading ? "Uploading..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
