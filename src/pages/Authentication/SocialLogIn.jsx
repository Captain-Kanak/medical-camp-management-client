import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const SocialLogIn = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleGoogleSignIn = () => {
    googleSignIn().then(async (result) => {
      const user = result.user;

      const email = user.email;
      const lastSignInTime = user.metadata?.lastSignInTime;

      const userInfo = {
        name: user.displayName,
        email,
        photo: user.photoURL,
        role: "participant",
        creation_date: user.metadata?.creationTime,
        last_signin_time: lastSignInTime,
      };

      try {
        await axiosPublic.post("/users", userInfo);
      } catch (err) {
        console.warn("User already exists or failed to save:", err);
      }

      const res = await axiosPublic.patch("/users", {
        email,
        lastSignInTime,
      });

      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
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
    <div className="text-center mt-6">
      <div className="text-gray-500 dark:text-gray-400 mb-3">OR</div>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-300 bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md cursor-pointer"
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogIn;
