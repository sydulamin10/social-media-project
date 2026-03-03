import React, { useEffect, useRef, useState } from "react";
import { SearchIcon } from "../../../../assets/svg/SearchIcon";
import {
  useAddSearchHistoryMutation,
  useGetSearchHistoryQuery,
  useRemoveSearchHistoryMutation,
  useSearchQueryMutation,
} from "../../../../features/api/authApi";
import { Link } from "react-router-dom";
import avatar from "/src/assets/defaultImage/avatar.png";
import { CrossIcon } from "../../../../assets/svg/CrossIcon";
import { useSelector } from "react-redux";

const SearchBox = ({ setShowSearchBox }) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const [searchIconVisible, setSearchIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const inputBox = useRef(null);
  const [
    searchPosts,
    {
      data: searchResults,
      error: searchError,
      isLoading: isSearching,
      isSuccess: isSearchSuccess,
      isError: isSearchError,
      reset: resetSearch,
    },
  ] = useSearchQueryMutation();
  const [
    addSearchHistory,
    {
      data: addedSearchHistory,
      error: addSearchHistoryError,
      isLoading: isAddingSearchHistory,
      isSuccess: isAddSearchHistorySuccess,
      isError: isAddSearchHistoryError,
      reset: resetAddSearchHistory,
    },
  ] = useAddSearchHistoryMutation();
  const {
    data: searchHistoryList,
    error: searchHistoryError,
    isLoading: isSearchHistoryLoading,
    isFetching: isSearchHistoryFetching,
    isSuccess: isSearchHistorySuccess,
    isError: isSearchHistoryError,
    refetch: refetchSearchHistory,
  } = useGetSearchHistoryQuery(undefined, { refetchOnMountOrArgChange: true });

  const [
    removeSearchHistory,
    {
      data: removedSearchHistory,
      error: removeSearchHistoryError,
      isLoading: isRemovingSearchHistory,
      isSuccess: isRemoveSearchHistorySuccess,
      isError: isRemoveSearchHistoryError,
      reset: resetRemoveSearchHistory,
    },
  ] = useRemoveSearchHistoryMutation();

  useEffect(() => {
    inputBox.current.focus();
  }, []);

  const handleSearch = async (e) => {
    if (searchTerm === "") {
      setSearchTerm("");
    } else {
      const response = await searchPosts(searchTerm).unwrap();
    }
  };
  const handleClickSearch = async (searchUser) => {
    try {
      const response = await addSearchHistory({ searchUser }).unwrap();
      refetchSearchHistory();
      setShowSearchBox(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickForRemove = async (searchUser) => {
    await removeSearchHistory({ searchUser }).unwrap();
    await refetchSearchHistory();
  };

  return (
    <>
      <div>
        <div
          className={`flex items-center mx-5 gap-x-0 pl-4 rounded-full border border-secondary-color`}
        >
          {searchIconVisible && (
            <div
              onClick={() => inputBox.current.focus()}
              className={`text-secondary-color cursor-pointer`}
            >
              <SearchIcon />
            </div>
          )}
          <div>
            <input
              type="text"
              ref={inputBox}
              name="searchBox"
              placeholder="Search"
              onFocus={() => setSearchIconVisible(false)}
              onBlur={() => setSearchIconVisible(true)}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              onKeyUp={handleSearch}
              className={`w-[295px] font-Gilroy-Regular text-base focus:outline-none px-4 py-3`}
            />
          </div>
        </div>
        <div className={`px-5 py-1`}></div>
        {searchResults ? (
          <div
            className={`h-60 px-5 py-1 flex flex-col gap-y-3 overflow-y-auto`}
          >
            {searchResults.map((item) => (
              <Link
                to={`/profile/${item?.username}`}
                key={item?._id}
                onClick={() => handleClickSearch(item?._id)}
                className={`flex justify-start items-center gap-x-3 ${
                  themeMode === "dark" ? "text-white" : "text-black"
                }`}
              >
                <img
                  src={item?.profilePicture || avatar}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <span className="font-Gilroy-Regular text-base capitalize">
                  {item?.fName} {item?.lName}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className={`py-1`}>
            <div>
              <p className="font-Gilroy-Regular text-base text-black-color px-5">
                Recent Search...
              </p>
            </div>
            {searchHistoryList ? (
              <div>
                {searchHistoryList.map((item) => (
                  <div
                    key={item?.user?._id}
                    className={`px-5 py-1 flex justify-between items-center gap-x-1 cursor-pointer transition-all ease-linear duration-150 group ${
                      themeMode === "dark"
                        ? "hover:bg-white-color-100 text-white-color"
                        : "hover:bg-white-color-100 text-black-color"
                    }`}
                  >
                    <div
                      key={item?.user?._id}
                      className=" flex justify-start items-center gap-x-1"
                      onClick={() => setShowSearchBox(false)}
                    >
                      <Link to={`/profile/${item?.user?.username}`}>
                        <img
                          src={item.user.profilePicture || avatar}
                          alt="profilePhoto"
                          className="w-10 h-10 rounded-full"
                        />
                      </Link>
                      <h3
                        className={`font-Gilroy-Regular text-base capitalize tracking-widest ${
                          themeMode === "dark"
                            ? "group-hover:text-white-color text-black-color"
                            : "group-hover:bg-white-color-100 text-black"
                        } transition-all ease-linear duration-150`}
                      >
                        <Link to={`/profile/${item?.user?.username}`}>
                          {item.user.fName} {item.user.lName}
                        </Link>
                      </h3>
                    </div>
                    <div
                      onClick={() => handleClickForRemove(item?.user?._id)}
                      className="hover:bg-red-color hover:text-white-color p-1 transition-all ease-linear duration-200 cursor-pointer"
                    >
                      <CrossIcon />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span className="font-Gilroy-Regular text-base text-black-color px-5">
                No Search Result..
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBox;
