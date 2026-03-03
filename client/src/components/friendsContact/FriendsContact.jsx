import React from "react";
import { useGetAllFriendsQuery } from "../../features/api/authApi";
import avatar from "/src/assets/defaultImage/avatar.png";
import { useNavigate } from "react-router-dom";

const FriendsContact = () => {
  const {
    data: getAllFriends,
    isLoading: isFriendsLoading,
    isError: isFriendsError,
    error: friendsError,
    isSuccess: isFriendsSuccess,
    refetch: refetchFriends,
  } = useGetAllFriendsQuery();

  const navigate = useNavigate();
  const handleClick = (username) => {
    navigate(`/profile/${username}`);
  };
  return (
    <>
      <div>
        {getAllFriends?.friend.length > 0 ? (
          getAllFriends?.friend.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-x-2 cursor-pointer"
              onClick={() => handleClick(item?.username)}
            >
              <div className="w-8 shrink-0 2xl:w-12 h-8 2xl:h-12 bg-secondary-color rounded-full">
                <img
                  src={item?.profilePicture || avatar}
                  alt="profilePicture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h5 className="font-Gilroy-Bold text-sm text-black-color leading-none overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {item.fName} {item.lName}
                </h5>
              </div>
            </div>
          ))
        ) : (
          <span>not</span>
        )}
      </div>
    </>
  );
};

export default FriendsContact;
