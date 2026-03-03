import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";

const LoggedInUser = () => {
  const { userInfo } = useSelector((stat) => stat.userInformation);
  return userInfo ? <Outlet /> : <LoginPage />;
};

export default LoggedInUser;
