import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user] = useState();
  const [loading] = useState(true);

  const contexts = {
    user,
    loading,
  };

  return <AuthContext value={contexts}>{children}</AuthContext>;
};

export default AuthProvider;
