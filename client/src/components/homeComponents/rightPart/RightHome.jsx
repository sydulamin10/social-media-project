import React from "react";
import RightFriends from "./RightFriends";
import Stories from "./stories/Stories";
import {
  ToastContainer,
  toast,
  Bounce,
  Slide,
  Zoom,
  Flip,
} from "react-toastify";
import FriendsContact from "../../friendsContact/FriendsContact";

const RightHome = () => {
  return (
    <>
      <div>
        <RightFriends toast={toast} Bounce={Bounce} />
      </div>
      <div className="mt-10">
        <Stories />
      </div>
      <div className="mt-10 flex flex-col gap-y-2">
        <h1>Friend List</h1>
        <FriendsContact />
      </div>
    </>
  );
};

export default RightHome;
