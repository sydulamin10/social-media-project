import React from "react";
import defaultImage from "../../assets/defaultImage/avatar.png";
import { Link } from "react-router-dom";

const FriendList = ({ friends }) => {
  const friendsCount = () => {
    const total_count = friends?.length || 0;
    return total_count === 0
      ? "0 friend"
      : total_count === 1
      ? `${total_count} friend`
      : `${total_count} friends`;
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <div className="">
            <h3 className="font-Gilroy-Bold text-base text-black-color capitalize">
              Friends
            </h3>
            <span className="font-Gilroy-Medium text-sm text-secondary-color">
              {friendsCount()}
            </span>
          </div>
          {friends?.length > 4 && (
            <div>
              <button
                // onClick={handleShowMore}
                className="font-Gilroy-Bold text-sm text-white-color bg-blue-color px-4 py-2 rounded-md cursor-pointer"
              >
                {showMore ? "Show Less..." : "Show More..."}
              </button>
            </div>
          )}
        </div>
        <div className="min-h-40 grid grid-cols-2 justify-start items-center gap-2 mt-2">
          {friends?.length &&
            friends?.slice(0, 4).map((friend, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <Link to={`/profile/${friend.username}`}>
                  <img
                    key={friend?._id}
                    src={friend?.profilePicture || defaultImage}
                    alt="Image"
                    className={`h-32 w-32 object-cover rounded-full`}
                  />
                </Link>
                <Link
                  to={`/profile/${friend.username}`}
                  className="font-Gilroy-Medium text-base text-black-color"
                >
                  {friend.fName} {friend.lName}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default FriendList;
