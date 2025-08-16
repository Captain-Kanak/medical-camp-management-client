import React, { useState } from "react";
import SocialLogIn from "./SocialLogIn";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password } = data;

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        const userProfile = { displayName: name, photoURL: profilePic };
        updateUserProfile(userProfile)
          .then(async () => {
            const userInfo = {
              name,
              email,
              photo: profilePic,
              role: "participant",
              creation_date: user.metadata?.creationTime,
              last_signin_time: user.metadata?.lastSignInTime,
            };

            const res = await axiosPublic.post("/users", userInfo);
            if (res.data.insertedId) {
              navigate(from);
              Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                text: "Your account has been created successfully.",
                timer: 2000,
                showConfirmButton: false,
              });
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed",
              text: error.message,
            });
          });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data?.data?.url);
  };

  return (
    <div className="flex items-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-4 lg:p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Upload Your Photo
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full mt-1 file-input file-input-bordered file-input-primary text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm mt-1">
                Password must be 6 characters or longer
              </p>
            )}
          </div>

          {/* Submit */}
          <button className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transition-transform duration-300 shadow-lg">
            Register
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/signIn"
            className="text-blue-500 dark:text-indigo-400 hover:underline"
          >
            Sign In
          </Link>
        </div>

        {/* Social Login */}
        <div className="mt-6">
          <SocialLogIn />
        </div>
      </div>
    </div>
  );
};

export default Register;
