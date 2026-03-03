import React, { useEffect, useState } from "react";
import LeftProfile from "./LeftProfile";
import { LeftData } from "./LeftData";
import LeftHomeData from "./LeftHomeData";
import { Moon } from "../../../assets/svg/Moon";
import { Logout } from "../../../assets/svg/Logout";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../../../features/themes/themeSlice";
import { LoggedOutUsers } from "../../../features/users/authSlice";

const LeftPart = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(() => {
    return JSON.parse(localStorage.getItem("mode")) === "dark";
  });

  const themeMode = useSelector((state) => state?.themeMode?.mode);

  const handleMode = () => {
    if (themeMode === "light") {
      dispatch(setThemeMode("dark"));
      localStorage.setItem("mode", JSON.stringify("dark"));
    } else if (themeMode === "dark") {
      dispatch(setThemeMode("light"));
      localStorage.setItem("mode", JSON.stringify("light"));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(LoggedOutUsers());
    dispatch(setThemeMode("light"));
    localStorage.setItem("mode", JSON.stringify("light"));
    navigate("/login");
  };
  return (
    <>
      <div className="h-full xl:h-au flex xl:flex-none flex-col justify-between xl:justify-normal items-center">
        <div>
          <LeftProfile />
        </div>
        <div className={`xl:w-3/4 xl:mt-10 xl:mx-auto`}>
          {LeftData.map((data, index) => (
            <LeftHomeData key={index} data={data} />
          ))}
        </div>
        <div className={`xl:w-3/4 xl:mt-10 xl:mx-auto block xl:hidden`}>
          <div
            onClick={() => handleMode()}
            className="w-10 h-10 rounded-full bg-white-color-100 flex items-center justify-center mb-3 cursor-pointer hover:bg-black-color hover:text-white-color transition-all ease-linear duration-75"
          >
            <Moon />
          </div>
          <div
            onClick={handleLogout}
            className="w-10 h-10 rounded-full bg-white-color-100 flex items-center justify-center cursor-pointer hover:bg-black-color hover:text-white-color transition-all ease-linear duration-75"
          >
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftPart;
