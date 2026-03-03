import React from "react";
import { MediaIcon } from "../../../../assets/svg/MediaIcon";
import { LiveIcon } from "./../../../../assets/svg/LiveIcon";
import { CircleProfileIcon } from "./../../../../assets/svg/CircleProfileIcon";
import { useSelector } from "react-redux";

const AddPost = ({ isShowImageViewer, setIsShowImageViewer }) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  return (
    <>
      <div className="p-2 border border-line-color rounded-md flex justify-between items-center">
        <h5 className="font-Gilroy-Bold text-base text-black-color">
          Add to your Post{" "}
        </h5>
        <div className="flex justify-center items-center gap-x-3">
          <div
            className={`w-10 h-10 flex justify-center items-center ${
              isShowImageViewer && "bg-secondary-bg text-white-color"
            } hover:text-white-color rounded-full transition-all ease-linear duration-200 cursor-pointer ${
              themeMode === "dark"
                ? "hover:bg-black-color text-black-color"
                : "hover:bg-secondary-bg"
            }`}
            onClick={() => setIsShowImageViewer(true)}
          >
            <MediaIcon />
          </div>
          <div
            className={`w-10 h-10 flex justify-center items-center ${
              themeMode === "dark"
                ? "hover:bg-black-color hover:text-white-color text-black-color"
                : "hover:bg-secondary-bg hover:text-white-color"
            }  rounded-full transition-all ease-linear duration-200 cursor-pointer`}
          >
            <LiveIcon />
          </div>
          <div
            className={`w-10 h-10 flex justify-center items-center ${
              themeMode === "dark"
                ? "hover:bg-black-color hover:text-white-color text-black-color"
                : "hover:bg-secondary-bg hover:text-white-color"
            }  rounded-full transition-all ease-linear duration-200 cursor-pointer`}
          >
            <CircleProfileIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
