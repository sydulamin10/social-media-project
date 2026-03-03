import React, { useState } from "react";
import { Moon } from "./../../../../assets/svg/Moon";
import { Logout } from "./../../../../assets/svg/Logout";
import DisplayDarkMode from "./DisplayDarkMode";
import { useDispatch } from "react-redux";
import { LoggedOutUsers } from "../../../../features/users/authSlice";
import { setThemeMode } from "../../../../features/themes/themeSlice";
import { useNavigate } from "react-router-dom";

const SettingsOptions = () => {
  const [isDisplayDarkMode, setIsDisplayDarkMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isDisplayDarkMode) {
    return <DisplayDarkMode setIsDisplayDarkMode={setIsDisplayDarkMode} />;
  }
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(LoggedOutUsers());
    // dispatch(setThemeMode("light"));
    // localStorage.setItem("mode", JSON.stringify("light"));
    navigate("/login");
  };
  return (
    <>
      <ul className="p-1 2xl:p-3 rounded-2xl">
        <li
          onClick={() => setIsDisplayDarkMode(!isDisplayDarkMode)}
          className="flex items-center gap-x-2 mb-5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-white-color-100 flex items-center justify-center">
            <Moon />
          </div>
          <div>
            <p className="font-Gilroy-Bold text-sm 2xl:text-base text-black-color group-hover:text-secondary-color transition-all ease-linear duration-75">
              Display & Accessability
            </p>
          </div>
        </li>
        <li
          onClick={handleLogout}
          className="flex items-center gap-x-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-white-color-100 flex items-center justify-center">
            <Logout />
          </div>
          <div>
            <p className="font-Gilroy-Bold text-base text-black-color group-hover:text-secondary-color transition-all ease-linear duration-75">
              Logout
            </p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default SettingsOptions;
