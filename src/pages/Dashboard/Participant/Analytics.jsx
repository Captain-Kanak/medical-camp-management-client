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

  const chartData = registeredCamps.map((camp) => ({
    name:
      camp.campName.length > 15
        ? camp.campName.slice(0, 15) + "..."
        : camp.campName,
    fees: parseFloat(camp.fees),
  }));

  if (isLoading) return <Spinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
    >
      <div className="max-w-5xl mx-auto bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-6">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-center mb-6 text-white drop-shadow-md">
          Camp Fees Analytics
        </h2>

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={420}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.7} />
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
              <Legend wrapperStyle={{ color: "#fff", fontWeight: "bold" }} />
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
            You haven’t registered for any camps yet.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Analytics;
