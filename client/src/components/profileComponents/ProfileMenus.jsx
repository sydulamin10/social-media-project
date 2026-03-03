import React from "react";
import { ScaleLoader } from "react-spinners";

const ProfileMenus = ({ posts, profile, imageData }) => {
  return (
    <>
      <ul className="py-5 flex justify-end items-center gap-x-6 pr-6">
        <li className="text-center">
          <h6 className="font-Gilroy-SemiBold text-base text-black-color">
            Friends
          </h6>
          <p className="font-Gilroy-Bold text-xl text-black-color">
            {(profile &&
              profile?.friends?.length.toString().padStart(2, 0)) || (
              <ScaleLoader height={16} color={"#1fa0ef"} />
            )}
          </p>
        </li>
        <li className="text-center">
          <h6 className="font-Gilroy-Bold text-base text-black-color">Posts</h6>
          <p className="font-Gilroy-Bold text-xl text-black-color">
            {profile?.posts?.length.toString().padStart(2, 0) || (
              <ScaleLoader height={16} color={"#1fa0ef"} />
            )}
          </p>
        </li>
        <li className="text-center">
          <h6 className="font-Gilroy-Bold text-base text-black-color">
            Followers
          </h6>
          <p className="font-Gilroy-Bold text-xl text-black-color">
            {(profile &&
              profile?.followers?.length.toString().padStart(2, 0)) || (
              <ScaleLoader height={16} color={"#1fa0ef"} />
            )}
          </p>
        </li>
        <li className="text-center">
          <h6 className="font-Gilroy-Bold text-base text-black-color">
            Following
          </h6>
          <p className="font-Gilroy-Bold text-xl text-black-color">
            {(profile &&
              profile?.following?.length.toString().padStart(2, 0)) || (
              <ScaleLoader height={16} color={"#1fa0ef"} />
            )}
          </p>
        </li>
        <li className="text-center">
          <h6 className="font-Gilroy-Bold text-base text-black-color">
            Photos
          </h6>
          <p className="font-Gilroy-Bold text-xl text-black-color">
            {imageData?.length.toString().padStart(2, 0) || (
              <ScaleLoader height={16} color={"#1fa0ef"} />
            )}
          </p>
        </li>
      </ul>
    </>
  );
};

export default ProfileMenus;
