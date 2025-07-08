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

    const userProfile = {
      displayName: data.name,
      photoURL,
    };

    try {
      await updateUserProfile(userProfile);

      const userInfo = {
        email: data.email,
        name: data.name,
        photo: photoURL,
      };

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
    reset({
      name: user?.displayName || "",
      email: user?.email || "",
    });
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
      if (url) {
        setProfilePic(url);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      Swal.fire("Upload Error", "Image upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col items-center space-x-4 mb-4">
          <img
            src={user?.photoURL || userImage}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="mt-2">
            <h3 className="text-xl text-center text-black font-semibold">
              {user?.displayName}
            </h3>
            <p className="text-gray-600 text-center">{user?.email}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            onClick={openModal}
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="rounded-lg bg-white shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold mb-4">Update Profile</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* name field */}
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* image field */}
              <div>
                <label className="block text-sm font-medium">
                  Upload Photo
                </label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full border px-3 py-2 rounded cursor-pointer"
                />
                {uploading && (
                  <p className="text-sm text-yellow-600">Uploading...</p>
                )}
                {/* {profilePic && (
                  <div className="mt-2">
                    <img
                      src={profilePic}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                )} */}
              </div>

              {/* email field */}
              <div>
                <label className="block text-sm font-medium">
                  Email (read-only)
                </label>
                <input
                  {...register("email")}
                  type="email"
                  disabled
                  className="w-full border px-3 py-2 rounded bg-gray-100"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-black rounded cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className={`cursor-pointer px-4 py-2 rounded text-white ${
                    uploading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
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
