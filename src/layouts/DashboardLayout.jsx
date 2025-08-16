import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../components/Logo";
import { CgProfile } from "react-icons/cg";
import { MdManageAccounts, MdPayment } from "react-icons/md";
import useUserRole from "../hooks/useUserRole";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaCampground, FaPlusCircle } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Top Navbar */}
          <div className="navbar bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
            <div className="flex-none">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost text-white lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2 text-xl font-bold tracking-wide">
              Dashboard
            </div>
          </div>

          {/* Outlet Content */}
          <div>
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu min-h-full w-80 p-5 bg-base-200/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 shadow-xl space-y-2">
            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <Logo />
            </div>

            {/* Common Link */}
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-3 py-2 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                      : "hover:bg-base-300"
                  }`
                }
              >
                <CgProfile size={22} /> Profile
              </NavLink>
            </li>

            {/* Organizer Menu */}
            {!roleLoading && role === "organizer" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/add-camp"
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-3 py-2 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "hover:bg-base-300"
                      }`
                    }
                  >
                    <FaPlusCircle size={20} /> Add A Camp
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-camp"
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-3 py-2 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "hover:bg-base-300"
                      }`
                    }
                  >
                    <MdManageAccounts size={20} /> Manage Camps
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-registered-camps"
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-3 py-2 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "hover:bg-base-300"
                      }`
                    }
                  >
                    <HiOutlineClipboardList size={20} /> Manage Registered Camps
                  </NavLink>
                </li>
              </>
            )}

            {/* Participant Menu */}
            {!roleLoading && role === "participant" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-3 py-2 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "hover:bg-base-300"
                      }`
                    }
                  >
                    <IoAnalyticsSharp size={20} /> Analytics
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/registered-camps"
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-3 py-2 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "hover:bg-base-300"
                      }`
                    }
                  >
                    <FaCampground size={20} /> Registered Camps
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/payment-history"
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-3 py-2 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "hover:bg-base-300"
                      }`
                    }
                  >
                    <MdPayment size={20} /> Payment History
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
