import React from "react";
import { Moon } from "./../../../../assets/svg/Moon";
import { BackIcon } from "./../../../../assets/svg/backIcon";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../../../../features/themes/themeSlice";

const DisplayDarkMode = ({ setIsDisplayDarkMode }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.themeMode.mode);
  console.log(themeMode);

  return (
    <>
      <div className="p-3 rounded-2xl">
        <div className="flex items-center gap-x-3  mb-4">
          <div
            onClick={() => setIsDisplayDarkMode(false)}
            className="hover:text-secondary-color cursor-pointer"
          >
            <BackIcon />
          </div>
          <h4 className="font-Gilroy-Medium 2xl:font-Gilroy-Bold text-sm 2xl:text-lg">
            Display & Accessability
          </h4>
        </div>
        <div className="flex items-center gap-x-4 mb-5 cursor-pointer group">
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
            <Moon />
          </div>
          <div className="w-4/5">
            <p className="font-Gilroy-Regular 2xl:font-Gilroy-Bold text-sm 2xl:text-base transition-all ease-linear duration-75">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
              delectus.
            </p>
            <div className="mt-2">
              <div
                className="flex items-center gap-4"
                onClick={() => {
                  dispatch(setThemeMode("light"));
                  localStorage.setItem("mode", JSON.stringify("light"));
                }}
              >
                <label
                  htmlFor="white"
                  className="font-Gilroy-Medium text-sm cursor-pointer"
                >
                  Off
                </label>
                <input
                  name="theme"
                  type="radio"
                  id="white"
                  checked={themeMode === "light"}
                  className="text-white-color cursor-pointer"
                />
              </div>
              <div
                onClick={() => {
                  dispatch(setThemeMode("dark"));
                  localStorage.setItem("mode", JSON.stringify("dark"));
                }}
                className="flex items-center gap-4"
              >
                <label
                  htmlFor="dark"
                  className="font-Gilroy-Medium text-sm cursor-pointer"
                >
                  On
                </label>
                <input
                  name="theme"
                  type="radio"
                  id="dark"
                  checked={themeMode === "dark"}
                  className="text-white-color cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayDarkMode;
