import axios from "axios";
import React from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://medical-camp-management-system-serv.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  // request interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      // Prefer localStorage token (or fallback to user?.accessToken if available)
      const token = localStorage.getItem("access-token") || user?.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
