// ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  //   console.log("User in ProtectedRoute:", user);

  if (!user) {
    return <Navigate to="/signIn" />;
  }

  return children;
};

export default ProtectedRoute;
