import axios from "axios";
import React from "react";

const axiosPublic = axios.create({
  baseURL: "https://medical-camp-management-system-serv.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
