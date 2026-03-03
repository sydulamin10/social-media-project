import React, { useState } from "react";
import { Moon } from "../../../../assets/svg/Moon";
import { Logout } from "../../../../assets/svg/Logout";
import SettingsOptions from "./SettingsOptions";

const DisplayDarkMode = () => {
  const [isDisplayLightMode, setIsDisplayLightMode] = useState(false);
  if (isDisplayLightMode) {
    return <SettingsOptions />;
  }
  return (
    <>
      <ul className="bg-black-color text-white-color p-3 rounded-2xl">
        <li
          onClick={() => setIsDisplayLightMode(!isDisplayLightMode)}
          className="flex items-center gap-x-2 mb-5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
            <Moon />
          </div>
          <div>
            <p className="font-Gilroy-Bold text-base text-white-color group-hover:text-secondary-color transition-all ease-linear duration-75">
              Display & Accessability
            </p>
          </div>
        </li>
        <li className="flex items-center gap-x-2 cursor-pointer group">
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
            <Logout />
          </div>
          <div>
            <p className="font-Gilroy-Bold text-base text-white-color group-hover:text-secondary-color transition-all ease-linear duration-75">
              Logout
            </p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default DisplayDarkMode;
