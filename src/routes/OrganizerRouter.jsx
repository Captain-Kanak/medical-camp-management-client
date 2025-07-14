import React from "react";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import useUserRole from "../hooks/useUserRole";
import { Navigate } from "react-router";

const OrganizerRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <Spinner />;
  }

  if (!user || role !== "organizer") {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default OrganizerRouter;
