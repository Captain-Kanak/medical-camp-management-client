import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: registeredCamps = [] } = useQuery({
    queryKey: ["registeredCamps", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/registered-camps?email=${user.email}`
      );
      return res.data;
    },
  });

  console.log(registeredCamps);

  return <div></div>;
};

export default Analytics;
