import React from "react";
import FriendCard from "../../components/friendsCard/FriendCard";
import { useGetAllFriendsQuery } from "../../features/api/authApi";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  ToastContainer,
  toast,
  Bounce,
  Slide,
  Zoom,
  Flip,
} from "react-toastify";
import { useState } from "react";

const FriendsPage = () => {
  const [friendCount, setFriendCount] = useState(4);
  const [requestCount, setRequestCount] = useState(4);
  const [sendRequestCount, setSendRequestCount] = useState(4);
  const location = useLocation();
  const {
    data: getAllFriends,
    isLoading: isFriendsLoading,
    isError: isFriendsError,
    error: friendsError,
    isSuccess: isFriendsSuccess,
    refetch: refetchFriends,
  } = useGetAllFriendsQuery();

  useEffect(() => {
    if (location.pathname === "/friends") {
      refetchFriends();
    }
  }, [location.pathname, refetchFriends]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="pr-3">
        <div>
          <div className="flex justify-between items-center border-b mb-3 border-line-color pb-2">
            <h2 className="font-Gilroy-Bold text-lg text-black-color capitalize">
              All Friend
            </h2>
            {friendCount < getAllFriends?.friend?.length && (
              <button
                className="btn btnPrimary"
                onClick={() => setFriendCount((prev) => prev + 4)}
              >
                See More...
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
            {getAllFriends?.friend &&
              getAllFriends?.friend
                .slice(0, friendCount)
                .map((item) => (
                  <FriendCard
                    key={item._id}
                    item={item}
                    type={"friend"}
                    refetchFriends={refetchFriends}
                    toast={toast}
                    Bounce={Bounce}
                  />
                ))}
          </div>
        </div>

        {/* Friend Request */}
        <div className="mt-6">
          <div className="flex justify-between items-center border-b mb-3 border-line-color pb-2">
            <h2 className="font-Gilroy-Bold text-lg text-black-color capitalize">
              Friend Request
            </h2>
            {requestCount < getAllFriends?.request?.length && (
              <button
                className="btn btnPrimary"
                onClick={() => setRequestCount((prev) => prev + 1)}
              >
                See More...
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
            {getAllFriends?.request &&
              getAllFriends?.request
                .slice(0, requestCount)
                .map((item) => (
                  <FriendCard
                    key={item._id}
                    item={item}
                    type={"request"}
                    refetchFriends={refetchFriends}
                    toast={toast}
                    Bounce={Bounce}
                  />
                ))}
          </div>
        </div>

        {/* Sent Request */}
        <div className="mt-6">
          <div className="flex justify-between items-center border-b mb-3 border-line-color pb-2">
            <h2 className="font-Gilroy-Bold text-lg text-black-color capitalize">
              sent Request
            </h2>
            {sendRequestCount < getAllFriends?.sentRequest?.length && (
              <button
                className="btn btnPrimary"
                onClick={() => setSendRequestCount((prev) => prev + 1)}
              >
                See More...
              </button>
            )}
          </div>
          {/* <h2 className="border-b mb-3 border-line-color pb-2 font-Gilroy-Bold text-lg text-black-color capitalize">
            sent Request
          </h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
            {getAllFriends?.sentRequest &&
              getAllFriends?.sentRequest
                .slice(0, sendRequestCount)
                .map((item) => (
                  <FriendCard
                    key={item._id}
                    item={item}
                    type={"sentRequest"}
                    refetchFriends={refetchFriends}
                    toast={toast}
                    Bounce={Bounce}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsPage;
