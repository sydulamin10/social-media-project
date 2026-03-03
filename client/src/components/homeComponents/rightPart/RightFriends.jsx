import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";
import {
  useAcceptFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useGetAllFriendsQuery,
} from "../../../features/api/authApi";
// import { formatDistance } from "date-fns";
import avatar from "/src/assets/defaultImage/avatar.png";

const RightFriends = ({ toast, Bounce }) => {
  const {
    data: getAllFriends,
    isLoading: isFriendsLoading,
    isError: isFriendsError,
    error: friendsError,
    isSuccess: isFriendsSuccess,
    refetch: refetchFriends,
  } = useGetAllFriendsQuery();
  const [
    deleteFriendRequest,
    {
      data: deleteFriendRequestData,
      isLoading: isDeletingFriendRequest,
      isSuccess: isDeleteFriendRequestSuccess,
      isError: isDeleteFriendRequestError,
      error: deleteFriendRequestError,
      reset: resetDeleteFriendRequest,
    },
  ] = useDeleteFriendRequestMutation();
  const [
    acceptFriendRequest,
    {
      isLoading: isAcceptingFriendRequest,
      isSuccess: isAcceptFriendRequestSuccess,
      isError: isAcceptFriendRequestError,
    },
  ] = useAcceptFriendRequestMutation();

  const handleAcceptFriendRequest = async (profileId) => {
    try {
      let result = await acceptFriendRequest(profileId).unwrap();
      refetchFriends?.();
      toast.success(result?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteFriendRequest = async (profileId) => {
    try {
      let result = await deleteFriendRequest(profileId).unwrap();
      refetchFriends?.();
      toast.success(result?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-Gilroy-Bold text-md 2xl:text-lg text-black-color capitalize">
              friends Request
            </h4>
          </div>
          <div>
            <Link
              to={"/friends"}
              className="font-Gilroy-Medium text-sm 2xl:text-base py-2 px-3 rounded-full border border-black-color hover:bg-black-color text-black-color hover:text-white-color transition-all ease-linear duration-200"
            >
              See All
            </Link>
          </div>
        </div>
        {getAllFriends?.request.length > 0 ? (
          getAllFriends?.request.map((item) => (
            <div
              key={item?._id}
              className="flex justify-between items-center mt-7 mb-2"
            >
              <div className="xl:w-7/10 2xl:w-1/2 flex items-center gap-x-2">
                <div className="w-8 shrink-0 2xl:w-12 h-8 2xl:h-12 bg-secondary-color rounded-full">
                  <img
                    src={item?.profilePicture || avatar}
                    alt="profilePicture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[60%] flex-1">
                  <h5 className="font-Gilroy-Bold text-sm text-black-color leading-none overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {item.fName} {item.lName}
                  </h5>
                </div>
              </div>
              <div className="shank-0 flex justify-end items-center gap-x-3">
                <button
                  onClick={() => handleAcceptFriendRequest(item?._id)}
                  className="hidden 2xl:block font-Gilroy-Regular px-3 text-sm py-1 border text-black-color border-black-color hover:bg-black-color hover:text-white-color capitalize rounded-full cursor-pointer transition-all ease-linear drop-shadow-blue-200"
                >
                  Accepte
                </button>
                <button
                  onClick={() => handleAcceptFriendRequest(item?._id)}
                  className="2xl:hidden font-Gilroy-Regular px-1 text-sm py-1 border text-black-color border-black-color hover:bg-black-color hover:text-white-color capitalize rounded-full cursor-pointer transition-all ease-linear drop-shadow-blue-200"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleDeleteFriendRequest(item?._id)}
                  className="hidden 2xl:block font-Gilroy-Regular px-3 text-sm py-1 border text-black-color border-red-color hover:bg-red-color hover:text-white-color capitalize rounded-full cursor-pointer transition-all ease-linear drop-shadow-blue-200"
                >
                  reject
                </button>
                <button
                  onClick={() => handleDeleteFriendRequest(item?._id)}
                  className="2xl:hidden xl:block font-Gilroy-Regular px-1 text-sm py-1 border text-black-color border-red-color hover:bg-red-color hover:text-white-color capitalize rounded-full cursor-pointer transition-all ease-linear drop-shadow-blue-200"
                >
                  <TbCancel />
                </button>
              </div>
            </div>
          ))
        ) : (
          <span className="font-Gilroy-Regular text-lg text-black-color">
            No Friend request...
          </span>
        )}
      </div>
    </>
  );
};

export default RightFriends;
