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
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${user.accessToken}`;

      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
