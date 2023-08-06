import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoutes = () => {
  const user = useSelector((state) => state.user.account);
  return user.auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
