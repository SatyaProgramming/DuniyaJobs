// RequiredCompanyAuth.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const RequiredCompanyAuth = ({ element: Component, ...rest }) => {
  const { isCompanyAuth } = useSelector((state) => state.companyAuth);

  if (isCompanyAuth) {
    return <Route {...rest} element={<Component />} />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default RequiredCompanyAuth;
