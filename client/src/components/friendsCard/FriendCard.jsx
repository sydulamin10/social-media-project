import React from "react";
import avatar from "/src/assets/defaultImage/avatar.png";
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useUnfriendMutation,
} from "../../features/api/authApi.js";
import { useNavigate } from "react-router-dom";

const FriendCard = ({ item, type, refetchFriends, toast, Bounce }) => {
  let [cancelFriendRequest] = useCancelFriendRequestMutation();
  let [acceptFriendRequest] = useAcceptFriendRequestMutation();
  // let [deleteFriendRequest] = useDeleteFriendRequestMutation();
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
  let [unfriend] = useUnfriendMutation();
  const navigate = useNavigate();

  const handleCancelFriendRequest = async (profileId) => {
    try {
      let result = await cancelFriendRequest(profileId).unwrap();
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

  const handleUnfriend = async (profileId) => {
    try {
      let result = await unfriend(profileId).unwrap();
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

  const handleRedirect = () => {
    navigate(`/profile/${item?.username}`);
  };
  return (
    <>
      <div className="w-full bg-white-color-100 rounded-md shadow-md">
        <div className="p-3 cursor-pointer" onClick={() => handleRedirect()}>
          <div className="w-30 h-30 rounded-full overflow-hidden mx-auto">
            <img
              src={item?.profilePicture || avatar}
              alt="friend'sPhoto"
              className="rounded-full"
            />
          </div>
          <div className="mt-2">
            <h2 className="w-full font-Gilroy-SemiBold text-lg text-black-color capitalize text-center overflow-hidden whitespace-nowrap overflow-ellipsis">
              {item?.fName} {item?.lName}
            </h2>
          </div>
        </div>
        <div>
          {type === "friend" ? (
            <div className="p-2">
              <button
                className="w-full btn btnDanger"
                onClick={() => handleUnfriend(item?._id)}
              >
                Unfriend
              </button>
            </div>
          ) : type === "request" ? (
            <div className="mt-2">
              <button
                className="w-full btn btnPrimary"
                onClick={() => handleAcceptFriendRequest(item?._id)}
              >
                Accept
              </button>
              <button
                className="btn w-full btnDanger mt-2"
                onClick={() => handleDeleteFriendRequest(item?._id)}
              >
                Reject
              </button>
            </div>
          ) : (
            type === "sentRequest" && (
              <div className="flex justify-around items-center mt-2">
                <button
                  className="w-full btn btnDanger"
                  onClick={() => handleCancelFriendRequest(item?._id)}
                >
                  Cancel Request
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default FriendCard;
