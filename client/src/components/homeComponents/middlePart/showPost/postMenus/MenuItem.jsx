import React from "react";
import { useSelector } from "react-redux";

const MenuItem = ({ icon, title }) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const Icon = icon;
  return (
    <>
      <div
        className={`flex justify-start items-center gap-x-3 px-3 py-1 text-secondary-color ${
          themeMode === "dark" && "hover:text-white-color-100"
        } hover:bg-white-color cursor-pointer hover:text-text-color transition-all ease-linear duration-100`}
      >
        <Icon />
        <span className={`font-Gilroy-Regular text-base  text-black-color`}>
          {title}
        </span>
      </div>
    </>
  );
};

export default MenuItem;
