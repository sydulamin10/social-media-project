import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const NotLoggedInUser = () => {
  const { userInfo } = useSelector((stat) => stat.userInformation);
  return userInfo ? <Navigate to={"/"} /> : <Outlet />;
};

export default NotLoggedInUser;
