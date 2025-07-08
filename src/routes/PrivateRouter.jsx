import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Spinner from "../components/Spinner";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  }

  return children;
};

export default PrivateRouter;
