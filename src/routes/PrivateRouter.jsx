import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <h3>loading....</h3>;
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  }

  return children;
};

export default PrivateRouter;
