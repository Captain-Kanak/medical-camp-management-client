import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../components/Logo";
import { CgProfile } from "react-icons/cg";
import {
  MdFormatListBulletedAdd,
  MdManageAccounts,
  MdOutlineManageSearch,
} from "react-icons/md";

const DashboardLayout = () => {
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
              <NavLink className="text-lg">
                <CgProfile /> Profile
              </NavLink>
            </li>
            {/* Only for Organizer */}
            <li>
              <NavLink className="text-lg">
                <MdFormatListBulletedAdd /> Add A Camp
              </NavLink>
            </li>
            <li>
              <NavLink className="text-lg">
                <MdOutlineManageSearch /> Manage Camps
              </NavLink>
            </li>
            <li>
              <NavLink className="text-lg">
                <MdManageAccounts /> Manage Registered Camps
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
