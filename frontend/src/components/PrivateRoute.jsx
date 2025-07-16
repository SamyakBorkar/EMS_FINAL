import React from "react";
import { Navigate } from "react-router-dom";

// children: jo component render hoga agar token valid hai
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
