import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import avatar from "/src/assets/defaultImage/avatar.png";

const LeftProfile = () => {
  const { userInfo } = useSelector((stat) => stat.userInformation);
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate("/profile")}
        className="lg:w-16 lg:h-16 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 bg-secondary-color rounded-full overflow-hidden mx-auto cursor-pointer"
      >
        <img
          src={userInfo?.profilePicture || avatar}
          alt=""
          className="rounded-full"
        />
      </div>
      <div className="text-center mt-3 hidden 2xl:block">
        <Link
          to={"/profile"}
          className="font-Gilroy-Bold text-lg text-black-color capitalize"
        >
          {userInfo.fName}
        </Link>
        <h4 className="font-Gilroy-Regular text-base text-secondary-color">
          {userInfo.email}
        </h4>
      </div>
    </>
  );
};

export default LeftProfile;
