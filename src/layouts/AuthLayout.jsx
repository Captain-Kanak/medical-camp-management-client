import React from "react";
import Lottie from "lottie-react";
import { Outlet } from "react-router";
import authentication from "../assets/lotties/authentication.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 lg:px-0 py-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16 my-12">
          {/* Lottie Animation */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Lottie
              animationData={authentication}
              loop={true}
              className="w-full max-w-md lg:max-w-lg"
            />
          </div>

          {/* Form Outlet */}
          <div className="w-full lg:w-1/2">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;
