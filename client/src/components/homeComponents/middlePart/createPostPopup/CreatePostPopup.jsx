import React, { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../../../../assets/svg/CrossIcon";
import AddPost from "./AddPost";
import EmojiPickers from "./EmojiPickers";
import ImageViewer from "./ImageViewer";
import OutSideClick from "../../../../functions/OutSideClick";
import {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useUploadImageMutation,
} from "../../../../features/api/authApi";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import PostError from "./PostError";
import dataURIToBlob from "../../../../functions/dataURIToBlob";
import avatar from "/src/assets/defaultImage/avatar.png";

const CreatePostPopup = ({ visible, setVisible }) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const [text, setText] = useState("");
  const [isShowImageViewer, setIsShowImageViewer] = useState(false);
  const [image, setImage] = useState([]);
  const [background, setBackground] = useState("");
  const [createPost] = useCreatePostMutation();
  const [uploadImage] = useUploadImageMutation();
  const {
    data: allPostData,
    error: errorWhenLoadData,
    isLoading,
    isFetching,
    refetch: refetchPost,
  } = useGetAllPostsQuery();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textRef = useRef(null);
  const postPopup = useRef(null);
  const { userInfo } = useSelector((stat) => stat.userInformation);

  const handleClick = () => {
    setVisible(false);
  };
  // Protect Scroll
  useEffect(() => {
    const body = document.body;
    if (visible) {
      document.body.classList.add("!overflow-hidden");
    } else {
      document.body.classList.remove("!overflow-hidden");
    }
    return () => {
      document.body.classList.remove("!overflow-hidden");
    };
  }, [visible]);

  OutSideClick(postPopup, () => {
    setVisible(false);
  });

  const handlePostSubmission = async () => {
    try {
      let response;
      setLoading(true);
      if (background) {
        response = await createPost({
          userId: userInfo.id,
          loginRefreshToken: userInfo.loginRefreshToken,
          type: null,
          images: null,
          text,
          background,
        }).unwrap();
        if (response.status === "done") {
          // await refetchPost();
          setLoading(false);
          setText("");
          setBackground("");
          setVisible(false);
        }
      } else if (image && image.length > 0) {
        const postImages = image.map((item, index) => dataURIToBlob(item));
        const path = `${userInfo.username.replace(/\s+/g, "_")}/post_images`;
        let formData = new FormData();
        formData.append("path", path);
        postImages.forEach((image) => {
          formData.append("file", image);
        });
        const responseImage = await uploadImage({
          formData,
          path,
          token: userInfo.loginRefreshToken,
        }).unwrap();
        response = await createPost({
          userId: userInfo.id,
          loginRefreshToken: userInfo.loginRefreshToken,
          type: null,
          images: responseImage,
          text,
          background: null,
        }).unwrap();
      } else if (text) {
        response = await createPost({
          userId: userInfo.id,
          loginRefreshToken: userInfo.loginRefreshToken,
          type: null,
          images: null,
          text,
          background,
        }).unwrap();
        if (response.status === "done") {
          // await refetchPost();
          setLoading(false);
          setText("");
          setBackground("");
          setVisible(false);
        }
      } else {
        return setError("You must input text or select image to post.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      await refetchPost();
      setLoading(false);
      setVisible(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-blur-color-white-50 flex justify-center items-center fixed top-0 left-0 z-50">
        <div
          className="w-9/10 md:w-3/5 lg:w-2/5 bg-white-color shadow-md relative"
          ref={postPopup}
        >
          {error && (
            <div
              className={`postError bg-redBlur-color text-red-color flex justify-center items-center rounded-md absolute top-1/2 left-1/2 -translate-1/2 z-50 overflow-hidden`}
            >
              <PostError error={error} setError={setError} />
            </div>
          )}
          <div
            className={`border-b ${
              themeMode === "dark"
                ? "border-secondary-color"
                : "border-white-color-100"
            } p-2 relative`}
          >
            <h3 className="font-Gilroy-Bold text-md md:text-lg text-black-color text-center">
              Create Post
            </h3>
            <div
              onClick={handleClick}
              className="hover:bg-red-color text-black-color hover:text-white-color p-1 transition-all ease-linear duration-200 cursor-pointer absolute right-2 top-2"
            >
              <CrossIcon />
            </div>
          </div>
          <div className="px-3 py-4 text-justify">
            <div className="flex justify-start items-center gap-x-2">
              <div className="w-12 h-12 bg-secondary-color rounded-full overflow-hidden">
                <img
                  src={userInfo?.profilePicture || avatar}
                  alt=""
                  className="rounded-full"
                />
              </div>
              <h4 className="font-Gilroy-SemiBold text-base text-black-color capitalize">
                {userInfo.fName} {userInfo.lName}
              </h4>
            </div>
            {isShowImageViewer ? (
              <div>
                <ImageViewer
                  text={text}
                  setText={setText}
                  textRef={textRef}
                  image={image}
                  setImage={setImage}
                  setError={setError}
                  setIsShowImageViewer={setIsShowImageViewer}
                />
              </div>
            ) : (
              <EmojiPickers
                text={text}
                setText={setText}
                textRef={textRef}
                background={background}
                setBackground={setBackground}
              />
            )}
            <div>
              <AddPost
                isShowImageViewer={isShowImageViewer}
                setIsShowImageViewer={setIsShowImageViewer}
              />
            </div>

            <div className="mt-3">
              <button
                onClick={handlePostSubmission}
                // disabled={!text || loading || image.length !== 0}
                disabled={(!text && image.length === 0) || loading}
                className={`w-full p-2 font-Gilroy-Bold text-base ${
                  themeMode === "dark"
                    ? "bg-primary-color"
                    : "bg-white-color-100"
                }  text-black-color rounded-sm ${
                  (text && !loading && "cursor-pointer") ||
                  (image.length > 0 && "cursor-pointer")
                } ${
                  (text && !loading) ||
                  (image.length > 0 &&
                    "hover:bg-black-color hover:text-white-color transition-all ease-linear duration-200")
                }`}
              >
                {loading ? <PulseLoader size={10} color="#2697ff" /> : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostPopup;
