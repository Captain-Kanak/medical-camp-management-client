import React from "react";
import logoImage from "../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        className="w-[50px] h-[50px] rounded-full"
        src={logoImage}
        alt="Logo"
      />
      <h1 className="text-2xl font-bold">
        Medi<span className="text-green-500">Camp</span>
      </h1>
    </div>
  );
};

export default Logo;
