import React from "react";
import Photos from "./Photos";
import UserProfileInfoDetails from "./userDetails/UserProfileInfoDetails";
import FriendList from "./FriendList";
import { useSelector } from "react-redux";

const ProfileLeft = ({
  imageData,
  imageLoading,
  profile,
  visitor,
  userInfo,
  friends,
}) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  // console.log(profile);
  return (
    <>
      <div
        className={`w-full ${
          themeMode === "dark" ? "main-color" : "bg-white-color"
        } mt-10`}
      >
        <div className={`w-full rounded-md shadow-md px-2 pb-2`}>
          <UserProfileInfoDetails
            profile={profile}
            visitor={visitor}
            userInfo={userInfo}
          />
        </div>
        <div className={`w-full rounded-md shadow-md mt-3 px-2 py-2`}>
          <Photos imageData={imageData} imageLoading={imageLoading} />
        </div>
        <div className="w-full rounded-md shadow-md mt-4 px-2 py-2">
          <FriendList friends={friends} />
        </div>
      </div>
    </>
  );
};

export default ProfileLeft;
