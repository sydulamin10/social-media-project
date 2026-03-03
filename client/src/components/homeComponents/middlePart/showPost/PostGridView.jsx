import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../../../assets/defaultImage/avatar.png";
import { formatDistance } from "date-fns/formatDistance";

const PostGridView = ({ item, userInfo }) => {
  return (
    <>
      {item?.images !== null && (
        <div className="border border-line-color rounded-md shadow-md overflow-hidden p-2">
          <div className="flex justify-start items-center gap-x-1 mb-2">
            <div className="w-1/6">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <Link to={`/profile/${item?.userId?._id}`}>
                  <img
                    src={item?.userId?.profilePicture || defaultImage}
                    alt="ProfilePicture"
                  />
                </Link>
              </div>
            </div>
            <div className="w-5/6">
              <Link
                to={`/profile/${item?.userId?._id}`}
                className="block h-5 font-Gilroy-Medium text-sm leading-none overflow-hidden"
              >
                {item?.userId?.fName}
              </Link>
              <span className="block font-Gilroy-Regular text-sm text-secondary-color leading-none">
                {formatDistance(item?.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          {item.images && item.images.length && (
            <div
              className={`relative border-5 border-white ${
                item.images.length === 1
                  ? "w-full  h-52 overflow-hidden rounded-md"
                  : item.images.length === 2
                  ? "w-full  h-52 grid grid-cols-2 gap-2 overflow-hidden rounded-md"
                  : item.images.length === 3
                  ? "w-full  h-52 grid grid-cols-2 gap-2 overflow-hidden rounded-md"
                  : item.images.length === 4
                  ? "w-full  h-52 grid grid-cols-2 gap-2 overflow-hidden rounded-md"
                  : item.images.length > 4 &&
                    "w-full  h-52 grid grid-cols-2 gap-2 overflow-hidden rounded-md"
              }`}
            >
              {item.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt="Image"
                  className={`"w-full h-auto object-cover" ${
                    item.images.length === 2
                      ? "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-2"
                      : item.images.length === 3 &&
                        "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3"
                  }`}
                />
              ))}
              {item.images.length > 4 && (
                <div className="w-8 h-8 flex justify-center items-center bg-blur-color-white-50 font-Gilroy-Bold text-base text-black absolute right-[18%] bottom-[15%] rounded-full">
                  <span>+{item.images.length - 4}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PostGridView;
