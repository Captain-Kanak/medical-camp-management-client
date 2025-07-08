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
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/available-camp">Available Camps</NavLink>
      </li>
    </>
  );

  return (
    <nav className="top-0 sticky z-10">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <span>
            <Logo />
          </span>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL || userImage} alt="User" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-gray-600 rounded-box w-52"
              >
                <li className="text-lg font-semibold text-gray-100 text-center">
                  {user.displayName || "Anonymous"}
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="text-lg font-semibold text-gray-100"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-lg font-semibold text-gray-100"
                  >
                    <CgLogOut size={25} /> Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">
              <button className="btn btn-primary">Join Us</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
