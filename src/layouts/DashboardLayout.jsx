import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../components/Logo";
import { CgProfile } from "react-icons/cg";
import { MdManageAccounts, MdPayment } from "react-icons/md";
import useUserRole from "../hooks/useUserRole";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaCampground, FaPlusCircle } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost lg:hidden"
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
            <div className="mx-2 flex-1 px-2 text-xl">Dashboard</div>
          </div>
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <div className="mb-2">
              <Logo />
            </div>
            <li>
              <NavLink to="/dashboard/profile" className="text-lg">
                <CgProfile /> Profile
              </NavLink>
            </li>

            {/* Only for Organizer */}
            {!roleLoading && role === "organizer" && (
              <>
                <li>
                  <NavLink to="/dashboard/add-camp" className="text-lg">
                    <FaPlusCircle /> Add A Camp
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-camp" className="text-lg">
                    <MdManageAccounts /> Manage Camps
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-lg">
                    <HiOutlineClipboardList /> Manage Registered Camps
                  </NavLink>
                </li>
              </>
            )}

            {/* Only for Participant */}
            {!roleLoading && role === "participant" && (
              <>
                <li>
                  <NavLink className="text-lg">
                    <IoAnalyticsSharp /> Analytics
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-lg">
                    <FaCampground /> Registered Camps
                  </NavLink>
                </li>
                <li>
                  <NavLink className="text-lg">
                    <MdPayment /> Payment History
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
