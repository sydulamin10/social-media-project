import React from "react";
import avatar from "/src/assets/defaultImage/avatar.png";
import { formatDistance } from "date-fns";
import { useSelector } from "react-redux";

const Comments = ({ singleComment }) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const { fName, lName, profilePicture } = singleComment.commentedBy;

  return (
    <>
      <div className="p-2 rounded-md overflow-hidden shadow-md">
        <div className="flex gap-x-2">
          <div className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden">
            <img
              src={profilePicture || avatar}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-Gilroy-Bold text-base text-black-color">
              {fName} {lName}
            </h2>
            <div
              className={`${
                themeMode === "dark" ? "bg-white-color" : "bg-white-color-100"
              } p-2 rounded-md`}
            >
              <p className="font-Gilroy-Regular text-base text-black-color mt-1">
                {singleComment.text}
              </p>
              {singleComment?.image && (
                <div className="mt-2">
                  <img
                    src={singleComment?.image}
                    alt="image"
                    className="w-64 h-auto object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <span className="font-Gilroy-Regular text-sm text-black-color mt-1">
              {formatDistance(singleComment.commentedAt, new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
