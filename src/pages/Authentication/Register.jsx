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

    // create user with email and password
    createUser(email, password)
      .then((result) => {
        const user = result.user;

        // update user profile in Firebase
        const userProfile = {
          displayName: name,
          photoURL: profilePic,
        };

        updateUserProfile(userProfile)
          .then(async () => {
            // send user info to the database
            const userInfo = {
              name,
              email,
              photo: profilePic,
              role: "participant", // default role
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
              text-black"
              placeholder="Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Image field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Your Photo
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
              text-black cursor-pointer"
              required
            />
          </div>

          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
              text-black"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
              text-black"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm mt-1">
                Password must be 6 characters or long
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Register
          </button>
        </form>

        {/* Link to login */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signIn" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
        <div>
          <SocialLogIn />
        </div>
      </div>
    </div>
  );
};

export default Register;
