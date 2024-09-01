import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../../helpers/auth_helper";

const AdminRoute = ({ children }) => {
  if (!isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default AdminRoute;
