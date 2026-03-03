import React, { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SettingsOptions from "./settingsOptions/SettingsOptions";
import OutSideClick from "./../../../functions/OutSideClick";
import { useSelector } from "react-redux";

const LeftHomeData = ({ data }) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const clickOutSide = useRef(null);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const ItemIcon = data.icon;
  const location = useLocation();
  const locationPath = location.pathname;

  OutSideClick(clickOutSide, () => {
    setIsShowDropdown(false);
  });

  const settingsSeparation = data.title === "Settings" && (
    <>
      <div className={`relative hidden md:block lg:hidden xl:block`}>
        <div
          className={`w-10 h-10 xl:w-auto xl:h-auto flex justify-center xl:justify-normal items-center xl:gap-x-4 xl:mb-7 ${
            isShowDropdown && "bg-black-color text-white-color"
          } xl:px-3 2xl:px-6 xl:py-3 rounded-full cursor-pointer hover:bg-black-color group transition-all ease-linear duration-100`}
          onClick={() => setIsShowDropdown(true)}
        >
          <div
            className={`${
              isShowDropdown && "bg-black-color text-white-color"
            } group-hover:text-white-color ${
              themeMode === "dark" && "text-white"
            } transition-all ease-linear duration-100`}
          >
            <ItemIcon />
          </div>
          <div className={`hidden xl:block`}>
            <p
              className={`font-Gilroy-SemiBold text-lg text-black-color ${
                isShowDropdown && "bg-black-color text-white-color"
              } group-hover:text-white-color transition-all ease-linear duration-100`}
            >
              {data.title}
            </p>
          </div>
        </div>
        {isShowDropdown && (
          <div
            ref={clickOutSide}
            className={`xl:w-[208px] 2xl:w-[270px] bg-white-color font-Gilroy-SemiBold shadow-md absolute right-0 lg:left-0 top-[60px] box-border capitalize`}
          >
            {<SettingsOptions />}
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {settingsSeparation ? (
        settingsSeparation
      ) : (
        <NavLink
          to={data.to}
          className={`w-10 h-10 xl:w-auto xl:h-auto flex justify-center xl:justify-normal items-center xl:gap-x-4 xl:mb-7 hover:bg-black-color xl:px-3 2xl:px-6 xl:py-1 2xl:py-3 rounded-full cursor-pointer group transition-all ease-linear duration-100 ${
            data?.to === locationPath && "bg-black-color text-white-color"
          }`}
        >
          <div
            className={`${
              data?.to === locationPath
                ? "text-white-color"
                : "text-black-color"
            }  group-hover:text-white-color transition-all ease-linear duration-100`}
          >
            <ItemIcon />
          </div>
          <div className={`hidden xl:block`}>
            <p
              className={`font-Gilroy-SemiBold text-lg text-black-color group-hover:text-white-color transition-all ease-linear duration-100 ${
                data?.to === locationPath && "text-white-color"
              }`}
            >
              {data.title}
            </p>
          </div>
        </NavLink>
      )}
    </>
  );
};

export default LeftHomeData;
