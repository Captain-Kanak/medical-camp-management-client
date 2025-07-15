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

  // Prepare data for chart
  const chartData = registeredCamps.map((camp) => ({
    name:
      camp.campName.length > 15
        ? camp.campName.slice(0, 15) + "..."
        : camp.campName, // shortened name
    fees: parseFloat(camp.fees),
  }));

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Camp Fees Overview
      </h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: "Fees (BDT)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="fees" fill="#4f46e5" name="Camp Fee" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No registered camps found.</p>
      )}
    </div>
  );
};

export default Analytics;
