import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllPostsQuery,
  useGetUserProfileQuery,
  useImageListMutation,
} from "../../features/api/authApi";
import { Helmet } from "react-helmet";
import ProfilePhotoInfo from "../../components/profileComponents/ProfilePhotoInfo";
import ProfileMenus from "../../components/profileComponents/ProfileMenus";
import ProfileLeft from "../../components/profileComponents/ProfileLeft";
import ProfileRight from "../../components/profileComponents/ProfileRight";
import CoverPhoto from "./../../components/profileComponents/cover/CoverPhoto";
import OldCoverPhoto from "../../components/profileComponents/cover/OldCoverPhoto";
import { useMediaQuery } from "react-responsive";

const ProfilePage = ({ visible, setVisible }) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const { username } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((stat) => stat.userInformation);
  let userName = username === undefined ? userInfo.username : username;
  const { data: profile } = useGetUserProfileQuery(userName);
  const [selectedCoverImage, setSelectedCoverImage] = useState("");
  const [isOldCoverPhotoShow, setIsOldCoverPhotoShow] = useState(false);
  const [scrollHeight, setScrollHeight] = useState();
  const [profileTopHeight, setProfileTopHeight] = useState(); // profileTopHeight = height
  const [profileLeftHeight, setProfileLeftHeight] = useState();
  const { data: posts } = useGetAllPostsQuery();
  const [
    imageList,
    { data: imageData, error: imageError, isLoading: imageLoading },
  ] = useImageListMutation();
  const path = `${userName.replace(/\s+/g, "_")}/*`;
  const sort = "desc";
  const max = 30;
  const profileTopRef = useRef(null);
  const profileLeftRef = useRef(null);

  useEffect(() => {
    if (profile && profile.Ok === false) {
      navigate("/profile");
    } else {
      imageList({ path, sort, max });
    }
  }, [profile]);

  const visitor = userName !== userInfo.username ? true : false;

  const getScroll = () => {
    setScrollHeight(window.scrollY);
  };

  useEffect(() => {
    setProfileTopHeight(profileTopRef.current.clientHeight + 40);
    setProfileLeftHeight(profileLeftRef.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", getScroll, { passive: true });
    };
  }, [scrollHeight]);

  const check = useMediaQuery({
    query: "(min-width: 1750px)",
  });

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      {/* --- Top Part --- */}
      <div className="bg-white-color-100 rounded-md" ref={profileTopRef}>
        <div className="relative">
          <CoverPhoto
            coverImage={profile?.cover}
            visitor={visitor}
            selectedCoverImage={selectedCoverImage}
            setSelectedCoverImage={setSelectedCoverImage}
            setIsOldCoverPhotoShow={setIsOldCoverPhotoShow}
          />
          <div className="w-full -mt-24 md:mt-0 md:absolute md:bottom-0 md:left-0 md:translate-y-1/3 md:z-30 px-5">
            <ProfilePhotoInfo
              profile={profile}
              visitor={visitor}
              imageData={imageData?.resources}
              userInfo={userInfo}
            />
          </div>
        </div>
        <div
          className={`ml-auto ${
            themeMode === "dark" ? "bg-white-color" : "bg-white-color-100"
          }`}
        >
          <ProfileMenus
            posts={posts}
            profile={profile}
            imageData={imageData?.resources}
          />
        </div>
      </div>

      {/* --- Bottom Part --- */}
      <div
        className={`md:w-9/10 4xl:w-full mx-auto grid grid-cols-1 4xl:grid-cols-5 gap-x-4 ${
          check && scrollHeight >= profileTopHeight && profileLeftHeight > 1000
            ? "scrollFixed showLess"
            : check &&
              scrollHeight >= profileTopHeight &&
              profileLeftHeight < 1000 &&
              "scrollFixed showMore"
        }`}
      >
        <div
          className="col-span-1 4xl:col-span-2 profileLeft"
          ref={profileLeftRef}
        >
          <ProfileLeft
            imageData={imageData}
            imageLoading={imageLoading}
            profile={profile?.details}
            visitor={visitor}
            userInfo={userInfo}
            friends={profile?.friends}
          />
        </div>
        <div className="col-span-1 4xl:col-span-3 profileRight">
          <ProfileRight
            visible={visible}
            setVisible={setVisible}
            profile={profile}
            posts={posts}
            userInfo={userInfo}
            visitor={visitor}
          />
        </div>
      </div>
      {isOldCoverPhotoShow && (
        <div className="absolute left-0 top-0 z-50">
          <OldCoverPhoto
            isOldCoverPhotoShow={isOldCoverPhotoShow}
            setIsOldCoverPhotoShow={setIsOldCoverPhotoShow}
            setSelectedCoverImage={setSelectedCoverImage}
            imageData={imageData?.resources}
            userInfo={userInfo}
          />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
