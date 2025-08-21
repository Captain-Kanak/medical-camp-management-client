import React from "react";
import { FaCampground, FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";

const DashboardHome = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard 🎉</h1>

      {/* Static Cards Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <FaUsers size={30} />
          <div>
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl font-bold">120</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <FaCampground size={30} />
          <div>
            <h2 className="text-lg font-semibold">Camps Organized</h2>
            <p className="text-2xl font-bold">15</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <MdPayment size={30} />
          <div>
            <h2 className="text-lg font-semibold">Payments</h2>
            <p className="text-2xl font-bold">$2,450</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <IoAnalyticsSharp size={30} />
          <div>
            <h2 className="text-lg font-semibold">Reports</h2>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
