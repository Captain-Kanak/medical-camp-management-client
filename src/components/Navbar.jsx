import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import userImage from "../assets/user.jpg";
import { CgLogOut } from "react-icons/cg";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Log Out Successful",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 text-lg font-medium transition-colors duration-300 ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/available-camp"
          className={({ isActive }) =>
            `px-3 py-2 text-lg font-medium transition-colors duration-300 ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300"
            }`
          }
        >
          Available Camps
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-0">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-white/90 dark:bg-gray-800/90 rounded-xl w-56 backdrop-blur-md"
            >
              {links}
            </ul>
          </div>
          <span className="flex items-center gap-2">
            <Logo />
          </span>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-3">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform duration-300"
              >
                <div className="w-11 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL || userImage} alt="User" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-3 shadow-xl menu menu-sm dropdown-content bg-white/95 dark:bg-gray-800/95 rounded-xl w-56 backdrop-blur-md"
              >
                <li className="text-lg font-semibold text-gray-700 dark:text-gray-100 text-center mb-2">
                  {user.displayName || "Anonymous"}
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="text-lg font-medium text-gray-700 dark:text-gray-100 hover:text-blue-500 transition-colors"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center gap-2 text-lg font-medium text-red-500 hover:text-red-600 transition-colors"
                  >
                    <CgLogOut size={22} /> Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">
              <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer">
                Join Us
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
