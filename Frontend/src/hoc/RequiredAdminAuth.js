// RequiredAdminAuth.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const RequiredAdminAuth = ({ element: Component, ...rest }) => {
  const { isAdminAuth } = useSelector((state) => state.adminAuth);

  if (isAdminAuth) {
    return <Route {...rest} element={<Component />} />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default RequiredAdminAuth;
