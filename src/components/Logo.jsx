import React from "react";
import logoImage from "../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-2">
        <img
          className="w-[40px] h-[40px] rounded-full"
          src={logoImage}
          alt="Logo"
        />
        <h1 className="text-2xl font-bold">
          Medi<span className="text-green-500">Camp</span>
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
