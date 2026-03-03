import React, { useRef, useState } from "react";
import avatar from "../../assets/defaultImage/avatar.png";
import { CameraIcon } from "../../assets/svg/CameraIcon";
import ProfilePhoto from "./profilePhotoUpload/ProfilePhoto";
import FriendshipComponent from "./FriendshipComponent";

const ProfilePhotoInfo = ({ profile, visitor, imageData, userInfo }) => {
  const [visible, setVisible] = useState(false);
  const uploadPhoto = useRef(null);

  return (
    <>
      {visible && (
        <div className="w-[75%] md:w-[600px] bg-white-color p-2 fixed top-1/5 md:top-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-none z-50 rounded-md">
          <ProfilePhoto
            visible={visible}
            setVisible={setVisible}
            uploadPhoto={uploadPhoto}
            imageData={imageData}
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-x-10">
        <div className="flex flex-col md:flex-row justify-start items-center gap-x-3">
          <div className="relative">
            <div
              ref={uploadPhoto}
              style={{
                backgroundImage: `url(${profile?.profilePicture || avatar})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className="w-36 h-36 rounded-full border-4 border-white-color"
            ></div>
            {!visitor && (
              <div
                onClick={() => setVisible(true)}
                className="bg-primary-bg p-2 border border-line-color rounded-full text-white-color absolute bottom-1 right-1 cursor-pointer"
              >
                <CameraIcon />
              </div>
            )}
          </div>
          <div className="mb-4">
            <h1 className="font-Gilroy-Bold text-xl md:text-3xl text-black-color md:text-white-color text-center md:text-left capitalize leading-none">
              {profile?.fName + " " + profile?.lName}
            </h1>
            <h5 className="font-Gilroy-Medium text-lg md:text-xl text-black-color md:text-white-color text-center md:text-left">
              {profile?.details?.otherName
                ? profile?.details?.otherName
                : // userInfo?.sortName
                  "OtherName"}
            </h5>
          </div>
        </div>
        {visitor && (
          <div className="flex justify-end items-center gap-x-3">
            <FriendshipComponent
              friendShips={profile?.friendShip}
              profileId={profile?._id}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePhotoInfo;
