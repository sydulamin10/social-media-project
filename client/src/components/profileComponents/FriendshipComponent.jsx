import React, { useEffect, useRef, useState } from "react";
import { FiUserCheck } from "react-icons/fi";
import UserMinus from "../../assets/svg/UserMinus";
import OutSideClick from "../../functions/OutSideClick";
import UserAddIcon from "../../assets/svg/UserAddIcon";
import UserNotAllowed from "../../assets/svg/UserNotAllowed";
import UserCheckIcon from "../../assets/svg/UserCheckIcon";
import {
  useAcceptFriendRequestMutation,
  useAddFriendMutation,
  useCancelFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useFollowRequestMutation,
  useUnfollowRequestMutation,
  useUnfriendMutation,
} from "../../features/api/authApi";

const FriendshipComponent = ({ friendShips, profileId }) => {
  const [friendShip, setFriendShip] = useState(friendShips);
  const [friendMenu, setFriendMenu] = useState(false);
  const [responseMenu, setResponseMenu] = useState(false);
  const friendMenuRef = useRef(null);
  const responseMenuRef = useRef(null);
  let [addFriend] = useAddFriendMutation();
  let [cancelFriendRequest] = useCancelFriendRequestMutation();
  let [followRequest] = useFollowRequestMutation();
  let [unfollowRequest] = useUnfollowRequestMutation();
  let [acceptFriendRequest] = useAcceptFriendRequestMutation();
  let [unfriend] = useUnfriendMutation();
  let [deleteFriendRequest] = useDeleteFriendRequestMutation();

  OutSideClick(friendMenuRef, () => {
    setFriendMenu(false);
  });
  OutSideClick(responseMenuRef, () => {
    setResponseMenu(false);
  });

  useEffect(() => {
    setFriendShip(friendShips);
  }, [friendShips]);

  const handleAddRequest = async () => {
    try {
      await addFriend(profileId).unwrap();
      setFriendShip({ ...friendShip, following: true, request: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptFriendRequest = async () => {
    try {
      await acceptFriendRequest(profileId).unwrap();
      setFriendShip({
        ...friendShip,
        friend: true,
        following: true,
        request: false,
        requestReceived: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      await cancelFriendRequest(profileId).unwrap();
      setFriendShip({ ...friendShip, following: false, request: false });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowRequest = async () => {
    try {
      await followRequest(profileId).unwrap();
      // setFriendShip({ ...friendShip, following: true });
      setFriendShip((prev) => ({
        ...prev,
        following: true,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollowRequest = async () => {
    try {
      await unfollowRequest(profileId).unwrap();
      setFriendShip({ ...friendShip, following: false });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfriend = async () => {
    try {
      await unfriend(profileId).unwrap();
      setFriendShip({
        ...friendShip,
        friend: false,
        following: false,
        request: false,
        requestReceived: false,
      });
      setFriendMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFriendRequest = async () => {
    try {
      await deleteFriendRequest(profileId).unwrap();
      setFriendShip({
        ...friendShip,
        friend: false,
        following: false,
        request: false,
        requestReceived: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {friendShip?.friend ? (
        <div className="relative rounded-md">
          <div
            onClick={() => setFriendMenu(true)}
            className="bg-white-color text-black-color p-2 rounded-md flex justify-start items-center gap-x-2 cursor-pointer"
          >
            <FiUserCheck />
            <span className="font-Gilroy-Medium text-base">Friend</span>
          </div>
          {friendMenu && (
            <div
              ref={friendMenuRef}
              className="w-50 bg-white-color text-black-color rounded-md absolute right-0 -bottom-1 translate-y-full shadow-md"
            >
              <ul>
                <li
                  onClick={() => handleUnfriend()}
                  className="px-3 py-1 flex justify-start items-center gap-x-2 cursor-pointer hover:text-red-color hover:bg-white-color-100 transition-all ease-linear duration-150"
                >
                  <div>
                    <UserMinus width="18px" height="18px" />
                  </div>
                  <span>Unfriend</span>
                </li>
                <li
                  onClick={() => handleUnfollowRequest()}
                  className="px-3 py-1 flex justify-start items-center gap-x-2 cursor-pointer hover:text-red-color hover:bg-white-color-100 transition-all ease-linear duration-150"
                >
                  <div>
                    <UserMinus width="18px" height="18px" />
                  </div>
                  <span>Unfollow</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        !friendShip?.request &&
        !friendShip?.requestReceived && (
          <button
            onClick={() => handleAddRequest()}
            className="bg-white-color text-black-color font-Gilroy-Medium text-base p-2 rounded-md cursor-pointer flex justify-start items-center gap-x-2"
          >
            <UserAddIcon width="18px" height="18px" />
            Add Friend
          </button>
        )
      )}
      {/* Friend Request Task Start From here */}
      {friendShip?.request ? (
        <button
          onClick={() => handleCancelFriendRequest()}
          className="bg-white-color text-black-color font-Gilroy-Medium text-base p-2 rounded-md cursor-pointer flex justify-start items-center gap-x-2 hover:text-red-color transition-all ease-linear duration-150"
        >
          <UserNotAllowed width="18px" height="18px" />
          Cancel Request
        </button>
      ) : (
        friendShip?.requestReceived && (
          <div className="relative">
            <div
              onClick={() => setResponseMenu(true)}
              className="bg-white-color text-black-color font-Gilroy-Medium text-base p-2 rounded-md cursor-pointer flex justify-start items-center gap-x-2"
            >
              <UserCheckIcon width="18px" height="18px" />
              Response
            </div>
            {responseMenu && (
              <div className="w-50 bg-white-color text-black-color rounded-md absolute right-0 -bottom-1 translate-y-full shadow-md">
                <ul ref={responseMenuRef}>
                  <li
                    onClick={() => handleAcceptFriendRequest()}
                    className="px-3 py-1 flex justify-start items-center gap-x-2 cursor-pointer hover:text-primary-color hover:bg-white-color-100 transition-all ease-linear duration-150"
                  >
                    <div>
                      <UserCheckIcon width="18px" height="18px" />
                    </div>
                    <span>Accept Request</span>
                  </li>
                  <li
                    onClick={() => handleDeleteFriendRequest()}
                    className="px-3 py-1 flex justify-start items-center gap-x-2 cursor-pointer hover:text-red-color hover:bg-white-color-100 transition-all ease-linear duration-150"
                  >
                    <div>
                      <UserMinus width="18px" height="18px" />
                    </div>
                    <span>Delete Friend Request</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )
      )}
      {/* following Task Start From here */}
      {friendShip?.following ? (
        <div
          onClick={() => handleUnfollowRequest()}
          className="bg-blue-color text-white-color font-Gilroy-Medium text-base p-2 rounded-md cursor-pointer flex justify-start items-center gap-x-2"
        >
          <UserCheckIcon width="18px" height="18px" />
          Following
        </div>
      ) : (
        <div
          onClick={() => handleFollowRequest()}
          className="bg-blue-color text-white-color font-Gilroy-Medium text-base p-2 rounded-md cursor-pointer flex justify-start items-center gap-x-2"
        >
          <UserCheckIcon width="18px" height="18px" />
          Follow
        </div>
      )}
    </>
  );
};

export default FriendshipComponent;
