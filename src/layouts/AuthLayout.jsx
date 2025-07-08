import React from "react";
import Lottie from "lottie-react";
import { Outlet } from "react-router";
import authentication from "../assets/lotties/authentication.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <div className="flex items-center flex-col lg:flex-row-reverse ">
        <div className="flex-1/2 px-4">
          <Lottie animationData={authentication} loop={true} />
        </div>
        <div className="flex-1/2">
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AuthLayout;
