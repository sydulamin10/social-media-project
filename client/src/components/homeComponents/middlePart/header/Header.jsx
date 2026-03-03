import React, { useRef, useState } from "react";
import { SearchIcon } from "./../../../../assets/svg/SearchIcon";
import SearchBox from "./SearchBox";
import OutSideClick from "../../../../functions/OutSideClick";
import { LeftData } from "../../leftPart/LeftData";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LeftHomeData from "../../leftPart/LeftHomeData";
import { useSelector } from "react-redux";
import { useGetSearchHistoryQuery } from "../../../../features/api/authApi";

const Header = () => {
  const { userInfo } = useSelector((stat) => stat.userInformation);
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const {
    data: searchHistoryList,
    error: searchHistoryError,
    isLoading: isSearchHistoryLoading,
    isFetching: isSearchHistoryFetching,
    isSuccess: isSearchHistorySuccess,
    isError: isSearchHistoryError,
    refetch: refetchSearchHistory,
  } = useGetSearchHistoryQuery();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const clickOutSide = useRef(null);
  const username = useParams();
  const location = useLocation();
  let urlPath = location.pathname;
  const navigate = useNavigate();

  const getTitle = () => {
    switch (urlPath) {
      case "/":
        return "News Feed";
        break;
      case "/message":
        return "Message";
        break;
      case "/friends":
        return "Friends";
        break;
      case "/media":
        return "Media";
        break;
      case "/profile":
        return "Profile";
        break;

      default:
        // dynamic profile route check
        if (location.pathname.startsWith("/profile/") && username) {
          return `Profile of ${username.username}`;
        }

        return "Social Media";
        break;
    }
  };

  OutSideClick(clickOutSide, () => {
    setShowSearchBox(false);
  });

  const handleClickForSearchBox = () => {
    refetchSearchHistory();
    setShowSearchBox(true);
  };

  return (
    <>
      <div
        className={`${
          themeMode === "dark" ? "bg-[#212121]" : "bg-white-color"
        } py-4 flex justify-between items-center`}
      >
        <div className={`lg:w-2/3`}>
          <h4
            className={`font-Gilroy-Bold text-2xl text-black-color hidden lg:block`}
          >
            {getTitle()}
          </h4>
          <div
            onClick={() => navigate("/")}
            className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-cyan-100 lg:hidden cursor-pointer"
            style={{
              backgroundImage: `url(${userInfo.profilePicture})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div className="lg:hidden flex justify-center items-center gap-x-3">
          {LeftData.map((item, index) => (
            <LeftHomeData key={index} data={item} />
          ))}
        </div>
        <div className={`lg:w-1/3 flex justify-end relative`}>
          <div
            className={`w-11 h-11 lg:w-[200px] flex justify-center lg:justify-end items-center gap-x-2 rounded-full border border-secondary-color`}
          >
            <div
              className={`${
                themeMode === "dark" ? "text-white" : "text-secondary-color"
              } lg:pl-4 box-border cursor-pointer`}
              onClick={() => handleClickForSearchBox()}
            >
              <SearchIcon />
            </div>
            <div className="hidden lg:block">
              <input
                type="text"
                name="searchBox"
                placeholder="Search"
                onClick={() => handleClickForSearchBox()}
                className={`w-full font-Gilroy-Regular text-base ${
                  themeMode === "dark"
                    ? "placeholder:text-white"
                    : "placeholder:text-secondary-color"
                } focus:outline-none px-4 py-3`}
              />
            </div>
          </div>
          {showSearchBox && (
            <div
              ref={clickOutSide}
              className={`w-52 lg:w-full min-h-[300px] max-h-[70vh] box-border absolute right-0 top-0 z-10 shadow-md text-black-color rounded-md ${
                themeMode === "dark" ? "bg-main-bg" : "bg-white-color"
              }`}
            >
              <SearchBox setShowSearchBox={setShowSearchBox} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
