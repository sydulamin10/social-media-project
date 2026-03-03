import React from "react";
import UserProfileInfoOptions from "./UserProfileInfoOptions";

const UserProfileInfoDetails = ({ profile, visitor, userInfo }) => {
  return (
    <>
      <div className="">
        <UserProfileInfoOptions
          profile={profile}
          visitor={visitor}
          userInfo={userInfo}
        />
      </div>
    </>
  );
};

export default UserProfileInfoDetails;
