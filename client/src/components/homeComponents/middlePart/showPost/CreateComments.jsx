import React, { useEffect, useRef, useState } from "react";
import defaultImage from "../../../../assets/defaultImage/avatar.png";
import { Link } from "react-router-dom";
import Feeling from "./../../../../assets/svg/Feeling";
import { MediaIcon } from "../../../../assets/svg/MediaIcon";
import EmojiPicker from "emoji-picker-react";
import { CrossIcon } from "../../../../assets/svg/CrossIcon";
import {
  useCreateCommentMutation,
  useUploadImageMutation,
} from "../../../../features/api/authApi";
import { ScaleLoader } from "react-spinners";
import dataURIToBlob from "../../../../functions/dataURIToBlob";
import { useSelector } from "react-redux";

const CreateComments = ({
  userInfo,
  commentText,
  setCommentText,
  commentImage,
  setCommentImage,
  // error,
  setError,
  textRef,
  postId,
  currentComments,
  setCurrentComments,
}) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const chooseFile = useRef(null);

  const [
    createComment,
    {
      isLoading: isCommentLoading,
      isSuccess: isCommentSuccess,
      isError: isCommentError,
      error: commentError,
    },
  ] = useCreateCommentMutation();
  const [
    uploadImage,
    {
      isLoading: isImageUploading,
      isSuccess: isImageUploadSuccess,
      isError: isImageUploadError,
      error: imageUploadError,
    },
  ] = useUploadImageMutation();

  const handleEmoji = ({ emoji }, e) => {
    const ref = textRef.current;
    ref.focus();
    const start = commentText.substring(0, ref.selectionStart);
    const end = commentText.substring(ref.selectionStart);
    const newCommentText = start + emoji + end;
    setCommentText(newCommentText);
    setCursorPosition(start.length + emoji.length);
  };

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  // console.log(currentComments);
  const handleCommentImageUpload = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      return setError(
        `${file.name} is unsupported file..! Only (jpeg, png, webp, gif) file formate is supported`
      );
    } else if (file.size > 1024 * 1024 * 5) {
      return setError(
        `${file.name} file size is too large. You must choose file maximum size below 5MB.`
      );
    } else {
      const renderFiles = new FileReader();
      renderFiles.readAsDataURL(file);
      renderFiles.onload = (readerImage) =>
        setCommentImage(readerImage.target.result);
    }
  };

  const handleComments = async (e) => {
    try {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (commentImage !== null) {
          const images = dataURIToBlob(commentImage);

          const path = `${userInfo.username.replace(
            /\s+/g,
            "_"
          )}/post_images/${postId}`;
          const formData = new FormData();
          formData.append("path", path);
          formData.append("file", images);
          const commentsPhoto = await uploadImage({
            formData,
            path,
          }).unwrap();
          const response = await createComment({
            comment: commentText,
            image: commentsPhoto[0].url,
            postId,
          }).unwrap();
          setCurrentComments(response);
        } else {
          const commentsResult = await createComment({
            comment: commentText,
            image: null,
            postId,
          }).unwrap();
          setCurrentComments(commentsResult);
        }
      } else {
        // console.log(e.key);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isCommentSuccess || isImageUploadSuccess) {
      setCommentText("");
      setCommentImage(null);
    }
  }, [isCommentSuccess, isImageUploadSuccess]);

  return (
    <>
      <div className="flex justify-start items-center gap-x-3">
        <div className="w-10 h-10 overflow-hidden rounded-full">
          <Link to={`/profile/${userInfo?._id}`}>
            <img
              src={userInfo?.profilePicture || defaultImage}
              alt="ProfilePicture"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
        <div
          className={`w-full ${
            themeMode === "dark" ? "bg-white-color" : "bg-white-color-100"
          } text-secondary-color rounded-full flex justify-between items-center gap-x-1`}
        >
          <input
            type="file"
            hidden
            // multiple
            accept="image/jpeg,image/png, image/webp,image/gif"
            ref={chooseFile}
            onChange={handleCommentImageUpload}
          />
          <input
            type="text"
            ref={textRef}
            placeholder={`Comment as ${userInfo.username}`}
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            onKeyUp={handleComments}
            className="w-full p-3 focus:outline-none bg-transparent font-Gilroy-Regular text-lg placeholder:font-Gilroy-Regular placeholder:text-lg break-words"
          />
          {(isCommentLoading || isImageUploading) && (
            <div className="w-12 mt-1">
              <ScaleLoader height={16} color={"#1fa0ef"} />
            </div>
          )}
          <div className="mr-3 text-text-color flex justify-end items-center gap-x-2 relative">
            {emojiPicker && (
              <div className="absolute -top-2 right-0 -translate-y-full z-20">
                <EmojiPicker
                  theme={themeMode === "dark" ? "dark" : "light"}
                  onEmojiClick={handleEmoji}
                />
              </div>
            )}
            <div
              onClick={() => setEmojiPicker((prev) => !prev)}
              className="cursor-pointer text-black-color"
            >
              <Feeling />
            </div>
            <div
              className="cursor-pointer text-black-color"
              onClick={() => chooseFile.current.click()}
            >
              <MediaIcon />
            </div>
          </div>
        </div>
      </div>
      {isCommentError && (
        <p className="font-Gilroy-Regular text-red-500 text-sm mt-1">
          {commentError?.data?.message || "Failed to post comment"}
        </p>
      )}
      {isImageUploadError && (
        <p className="font-Gilroy-Regular text-red-500 text-sm mt-1">
          {imageUploadError?.data?.message || "Image upload failed"}
        </p>
      )}
      {commentImage && (
        <div className="relative">
          <div className="w-36 overflow-hidden rounded-md mt-5 relative">
            <img
              src={commentImage}
              alt="commentImage"
              className="w-full h-auto object-cover"
            />
            <div
              onClick={() => setCommentImage(null)}
              className="bg-white-color hover:bg-red-color hover:text-white-color p-1 transition-all ease-linear duration-200 cursor-pointer absolute right-2 top-2"
            >
              <CrossIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateComments;
