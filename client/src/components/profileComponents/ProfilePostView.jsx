import React from "react";
import { GridViewIcon } from "./../../assets/svg/GridViewIcon";
import { ListViewIcon } from "./../../assets/svg/ListViewIcon";

const ProfilePostView = ({ postView, setPostView }) => {
  return (
    <>
      <div className="w-full rounded-md shadow-md p-4">
        <div className="border-b border-line-color">
          {/* <h1 className="font-Gilroy-Bold text-lg text-black-color">sdfsd</h1> */}
        </div>
        <div className="flex justify-around items-center gap-x-5">
          <div
            onClick={() => setPostView("list")}
            className={`w-1/2 flex justify-center items-center text-black-color gap-x-2 cursor-pointer pb-2 border-b-4 ${
              postView === "list"
                ? "border-blue-color text-blue-color"
                : "border-transparent"
            }`}
          >
            <ListViewIcon />
            <span
              className={`font-Gilroy-Bold text-base ${
                postView === "list" ? "text-blue-color" : "text-black-color"
              }`}
            >
              List View
            </span>
          </div>
          <div
            onClick={() => setPostView("grid")}
            className={`w-1/2 flex justify-center items-center text-black-color gap-x-2 cursor-pointer pb-2 border-b-4 ${
              postView === "grid"
                ? " border-blue-color text-blue-color"
                : "border-transparent"
            }`}
          >
            <GridViewIcon />
            <span
              className={`font-Gilroy-Bold text-base ${
                postView === "grid" ? "text-blue-color" : "text-black-color"
              }`}
            >
              Grid View
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePostView;
