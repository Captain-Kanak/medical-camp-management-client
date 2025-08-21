import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner";

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: registeredCamps = [], isLoading } = useQuery({
    queryKey: ["registeredCamps", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/registered-camps?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  // Prepare data
  const chartData = registeredCamps.map((camp) => ({
    name:
      camp.campName.length > 15
        ? camp.campName.slice(0, 15) + "..."
        : camp.campName,
    fees: parseFloat(camp.fees),
  }));

  const totalFees = registeredCamps.reduce(
    (sum, camp) => sum + parseFloat(camp.fees || 0),
    0
  );

  const confirmedCount = registeredCamps.filter(
    (c) => c.confirmation_status === "confirmed"
  ).length;
  const pendingCount = registeredCamps.filter(
    (c) => c.confirmation_status !== "confirmed"
  ).length;

  const pieData = [
    { name: "Confirmed", value: confirmedCount },
    { name: "Pending", value: pendingCount },
  ];

  const COLORS = ["#34d399", "#f59e0b"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg border border-white/30"
          >
            <h3 className="text-lg text-white/80">Total Camps</h3>
            <p className="text-3xl font-bold text-white">
              {registeredCamps.length}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg border border-white/30"
          >
            <h3 className="text-lg text-white/80">Total Fees</h3>
            <p className="text-3xl font-bold text-green-300">{totalFees} BDT</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg border border-white/30"
          >
            <h3 className="text-lg text-white/80">Confirmed</h3>
            <p className="text-3xl font-bold text-green-400">
              {confirmedCount}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg border border-white/30"
          >
            <h3 className="text-lg text-white/80">Pending</h3>
            <p className="text-3xl font-bold text-yellow-400">{pendingCount}</p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-6">
            <h2 className="text-2xl font-extrabold text-center mb-6 text-white drop-shadow-md">
              Camp Fees Overview
            </h2>

            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.7}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                  <XAxis dataKey="name" tick={{ fill: "#fff" }} />
                  <YAxis
                    tick={{ fill: "#fff" }}
                    label={{
                      value: "Fees (BDT)",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: "#fff", fontWeight: "bold" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      color: "#111",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ color: "#fff", fontWeight: "bold" }}
                  />
                  <Bar
                    dataKey="fees"
                    name="Camp Fee"
                    fill="url(#colorFees)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-white/80 text-lg py-10">
                No data available.
              </p>
            )}
          </div>

          {/* Pie Chart */}
          <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-6">
            <h2 className="text-2xl font-extrabold text-center mb-6 text-white drop-shadow-md">
              Confirmation Status
            </h2>

            {pieData.reduce((a, b) => a + b.value, 0) > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    wrapperStyle={{ color: "#fff", fontWeight: "bold" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      color: "#111",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-white/80 text-lg py-10">
                No confirmation data yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
