import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequiredAuthCompany = ({ children }) => {
	const { isAuth } = useSelector((state) => state.login);
	const location = useLocation();
	const from = {
		pathname: location.pathname,
	};

	if (isAuth) return children;
	return <Navigate to={"/login"} state={from} replace />;
};

export default RequiredAuthCompany;