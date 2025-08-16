import React from "react";
import SocialLogIn from "./SocialLogIn";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SignIn = () => {
  const { signInUser } = useAuth();
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
    const { email, password } = data;

    signInUser(email, password).then(async (result) => {
      const user = result.user;

      const updateInfo = {
        email: user.email,
        lastSignInTime: user.metadata?.lastSignInTime,
      };

      const res = await axiosPublic.patch("/users", updateInfo);
      if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
        navigate(from);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="flex items-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-4 lg:p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
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
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password Field */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              state={{ from }}
              className="text-blue-500 dark:text-indigo-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Social Login */}
        <div className="mt-6">
          <SocialLogIn />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
