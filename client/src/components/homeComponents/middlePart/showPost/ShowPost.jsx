import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../../../assets/defaultImage/avatar.png";
import { formatDistance } from "date-fns";
import { Dots } from "../../../../assets/STORE/svg/Dots";
import { LikeIcon } from "../../../../assets/svg/LikeIcon";
import { ShareIcon } from "../../../../assets/svg/ShareIcon";
import Reacts from "./Reacts";
import CreateComments from "./CreateComments";
import { CommentIcon } from "../../../../assets/svg/CommentIcon";
import PostError from "../createPostPopup/PostError";
import PostMenus from "./postMenus/PostMenus";
import defaultCoverPhoto from "./../../../../assets/defaultImage/defaultCover.jpg";
import avatar from "./../../../../assets/defaultImage/avatar.png";
import {
  useGetAllReactsQuery,
  useReactPostMutation,
} from "../../../../features/api/authApi";
import { useEffect } from "react";
import Comments from "./Comments";
import { useSelector } from "react-redux";

const ShowPost = ({ item, userInfo }) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const [isShowReact, setIsShowReact] = useState(false);
  const [isPostMenuVisible, setIsPostMenuVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentImage, setCommentImage] = useState(null);
  const [error, setError] = useState("");
  const [reactPost] = useReactPostMutation();
  const {
    data: reactsData,
    error: reactsError,
    isLoading: isReactsLoading,
    isFetching: isReactsFetching,
    isSuccess: isReactsSuccess,
    isError: isReactsError,
    refetch: refetchReacts,
  } = useGetAllReactsQuery({ postId: item._id });
  const textRef = useRef(null);
  const [currentComments, setCurrentComments] = useState();
  const [count, setCount] = useState(3);

  const check = reactsData?.check;
  const totalReact = reactsData?.total;
  const reactPerPost = reactsData?.reactsTotalCount;

  const handleReacts = async (reactType) => {
    try {
      await reactPost({ postId: item._id, react: reactType }).unwrap();
      refetchReacts();
    } catch (error) {
      console.log(error);
    }
  };

  const showMore = () => {
    setCount((prev) => prev + 3);
  };

  console.log(reactPerPost);

  return (
    <>
      <div
        className={`w-full p-3 box-border rounded-md mb-3 shadow-md relative overflow-hidden`}
      >
        <div className={`flex justify-between items-center`}>
          <div className="flex justify-between items-center gap-x-2">
            <div className="w-12 h-12 overflow-hidden rounded-full">
              <Link to={`/profile/${item?.userId?.username}`}>
                <img
                  src={item?.userId?.profilePicture || defaultImage}
                  alt="ProfilePicture"
                />
              </Link>
            </div>
            <div className="">
              <div className="flex items-center gap-x-2">
                <Link
                  to={`/profile/${item?.userId?.username}`}
                  className="font-Gilroy-ExtraBold text-lg text-black-color"
                >
                  {item?.userId?.fName} {item?.userId?.lName}
                </Link>
                {item.type === "profilePicture" && (
                  <span
                    className={`font-Gilroy-Medium text-sm ${
                      themeMode === "dark"
                        ? "text-black-color"
                        : "text-secondary-color"
                    } capitalize`}
                  >
                    Update{" "}
                    {item?.userId?.gender === "male"
                      ? "his"
                      : item?.userId?.gender === "female"
                      ? "her"
                      : "his/her"}{" "}
                    Profile Photo
                  </span>
                )}
                {item.type === "cover" && (
                  <span
                    className={`font-Gilroy-Medium text-sm ${
                      themeMode === "dark"
                        ? "text-black-color"
                        : "text-secondary-color"
                    } capitalize`}
                  >
                    Update{" "}
                    {item?.userId?.gender === "male"
                      ? "his"
                      : item?.userId?.gender === "female"
                      ? "her"
                      : "his/her"}{" "}
                    cover Photo
                  </span>
                )}
              </div>
              <span
                className={`block font-Gilroy-Medium text-sm ${
                  themeMode === "dark"
                    ? "text-black-color"
                    : "text-secondary-color"
                } capitalize`}
              >
                {formatDistance(item?.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <div className="relative">
            <div
              onClick={() => setIsPostMenuVisible(true)}
              className="w-10 h-10 text-blue-color cursor-pointer flex justify-center items-center hover:bg-white-color-100 rounded-full transition ease-linear duration-100"
            >
              <Dots />
            </div>
            {isPostMenuVisible && (
              <div className="z-40">
                <PostMenus
                  setIsPostMenuVisible={setIsPostMenuVisible}
                  postUserId={item?.userId?._id}
                  userInfo={userInfo}
                  postImages={item?.images}
                  postId={item._id}
                  isPostSave={reactsData?.isPostSave}
                  refetchReacts={refetchReacts}
                />
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            background: `url(${item?.background || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundOrigin: "content-box",
          }}
          className={`w-full ${
            item.background ? "h-96 justify-center" : "h-auto justify-start"
          }  box-border flex items-center mt-3`}
        >
          <h4
            className={`font-Gilroy-Bold text-center ${
              item.background
                ? "text-3xl text-white-color"
                : "text-xl text-black-color"
            }`}
          >
            {item.text}
          </h4>
        </div>

        {/* Image shows */}
        <div>
          {item.images && item.images.length && (
            <div
              className={`relative ${
                item.images.length === 1
                  ? "w-full h-full overflow-hidden rounded-md"
                  : item.images.length === 2
                  ? "w-full h-full grid grid-cols-2 gap-2 overflow-hidden rounded-md"
                  : item.images.length === 3
                  ? "w-full h-full grid grid-cols-2 gap-2 overflow-hidden rounded-md"
                  : item.images.length === 4
                  ? "w-full h-full grid grid-cols-2 gap-2 overflow-hidden rounded-md"
                  : item.images.length > 4 &&
                    "w-full h-full grid grid-cols-2 gap-2 overflow-hidden rounded-md"
              }`}
            >
              {item.type === "profilePicture" ? (
                <>
                  <div className="">
                    <div className="w-full h-[250px] overflow-hidden">
                      <img
                        src={item?.userId?.covers || defaultCoverPhoto}
                        alt="CoverPhoto"
                        className="w-full h-full object-center"
                      />
                    </div>
                    <div className="w-40 h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 xl:w-56 xl:h-56 2xl:w-80 2xl:h-80 rounded-full overflow-hidden mx-auto -mt-24 md:-mt-28 xl:-mt-34 2xl:-mt-40">
                      <img
                        src={item?.userId?.profilePicture || avatar}
                        alt="CoverPhoto"
                        className="w-full h-full object-center"
                      />
                    </div>
                  </div>
                </>
              ) : (
                item.images
                  .slice(0, 4)
                  .map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt="Image"
                      className={`w-full h-full object-cover ${
                        item.images.length === 2
                          ? "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-2"
                          : item.images.length === 3 &&
                            "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3"
                      }`}
                    />
                  ))
              )}
              {item.images.length > 4 && (
                <div className="w-12 h-12 flex justify-center items-center bg-blur-color-white-50 font-Gilroy-Bold text-sm md:text-base text-black absolute right-[21%] bottom-[21%] rounded-full">
                  <span>+{item.images.length - 4}</span>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Like Comments Section */}
        <div className="mt-3">
          <div className="flex justify-between items-center px-1 pb-2">
            <div className="w-1/2">
              <div className="flex justify-start items-center gap-x-1">
                {reactPerPost &&
                  reactPerPost.slice(0, 6).map(
                    (react, index) =>
                      react.count > 0 && (
                        <>
                          <img
                            key={index}
                            src={`/src/assets/reacts/${react?.react}.svg`}
                            alt="image"
                            className="w-5"
                          />
                        </>
                      )
                  )}
                <span className="font-Gilroy-Regular text-sm text-black-color">
                  {totalReact > 0 && totalReact}
                </span>
              </div>
            </div>
            <div className="w-1/2 text-right">
              <span className="font-Gilroy-Regular text-sm md:text-base text-black-color">
                {item?.comments &&
                  item?.comments.length > 0 &&
                  (item?.comments.length > 1
                    ? `${item?.comments.length} Comments`
                    : `${item?.comments.length} Comment`)}
              </span>
            </div>
          </div>
          <div className="border-t border-b border-line-color flex justify-between items-center">
            {/* react start */}
            <div
              onMouseEnter={() => setIsShowReact(true)}
              onMouseLeave={() => setIsShowReact(false)}
              className={`w-1/3 flex justify-center items-center gap-x-1 text-secondary-color cursor-pointer relative py-1 rounded-md ${
                themeMode === "dark"
                  ? "hover:bg-[#29313d]"
                  : "hover:bg-white-color-100"
              } transition-all ease-linear duration-75`}
            >
              <div
                onClick={() => handleReacts(check ? check : "Like")}
                className="flex justify-center items-center gap-x-1 py-2 px-4"
              >
                {check ? (
                  <img
                    src={`/src/assets/reacts/${check}.svg`}
                    className="w-5 h-auto"
                  />
                ) : (
                  <LikeIcon />
                )}
                <span
                  className={`${
                    check === "Like"
                      ? "text-blue-color"
                      : check === "Angry" || check === "Love"
                      ? "text-red-color"
                      : check === "Haha" || check === "Wow" || check === "Sad"
                      ? "text-yellow-color"
                      : "text-green-900"
                  }`}
                >
                  {check ? check : "Like"}
                </span>
              </div>
              {isShowReact && (
                <div className="absolute left-0 top-0 -translate-y-full">
                  <Reacts handleReacts={handleReacts} />
                </div>
              )}
            </div>
            {/* react end */}
            <div
              onClick={() => textRef.current.focus()}
              className={`w-1/3 flex justify-center items-center gap-x-1 text-secondary-color cursor-pointer py-3 rounded-md ${
                themeMode === "dark"
                  ? "hover:bg-[#29313d]"
                  : "hover:bg-white-color-100"
              } transition-all ease-linear duration-75`}
            >
              <CommentIcon />
              <span>Comments</span>
            </div>
            <div
              className={`w-1/3 flex justify-center items-center gap-x-1 text-secondary-color cursor-pointer py-3 rounded-md ${
                themeMode === "dark"
                  ? "hover:bg-[#29313d]"
                  : "hover:bg-white-color-100"
              } transition-all ease-linear duration-75`}
            >
              <ShareIcon />
              <span>Share</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            {item.comments
              .slice()
              .sort((a, b) => new Date(b.commentedAt) - new Date(a.commentedAt))
              .slice(0, count)
              .map((singleComment) => (
                <Comments
                  key={singleComment._id}
                  singleComment={singleComment}
                />
              ))}
          </div>
          {count < item?.comments.length && (
            <div className="flex justify-between items-center mt-2">
              <span className="font-Gilroy-Regular text-sm text-black-color capitalize">
                Show ({count.toString().padStart(2, 0)} of{" "}
                {item?.comments.length.toString().padStart(2, 0)})
              </span>
              <span
                onClick={showMore}
                className="font-Gilroy-Regular text-base text-black-color capitalize cursor-pointer pr-4 hover:text-primary-color transition-all ease-linear duration-150"
              >
                View more...
              </span>
            </div>
          )}
          <div className="py-2 mt-2">
            <CreateComments
              userInfo={userInfo}
              commentText={commentText}
              setCommentText={setCommentText}
              commentImage={commentImage}
              setCommentImage={setCommentImage}
              // error={error}
              setError={setError}
              textRef={textRef}
              postId={item._id}
              currentComments={currentComments}
              setCurrentComments={setCurrentComments}
            />
          </div>
        </div>
        {error && (
          <div className="w-full bg-white-color-100 absolute left-0 bottom-0">
            <PostError error={error} setError={setError} />
          </div>
        )}
      </div>
    </>
  );
};

export default ShowPost;
