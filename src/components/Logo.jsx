import React from "react";
import logoImage from "/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-1 lg:gap-2">
        <img
          className="w-[40px] h-[40px] rounded-full shadow-md"
          src={logoImage}
          alt="Logo"
        />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Medi<span className="ml-1">Camp</span>
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
