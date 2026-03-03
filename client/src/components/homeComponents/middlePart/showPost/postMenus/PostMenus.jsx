import React, { useRef, useState } from "react";
import OutSideClick from "./../../../../../functions/OutSideClick";
import MenuItem from "./MenuItem";
import { PinPost } from "../../../../../assets/svg/PinPost";
import { SavePost } from "../../../../../assets/svg/SavePost";
import { EditPost } from "../../../../../assets/svg/EditPost";
import { Download } from "./../../../../../assets/svg/Download";
import { ShowFullScreen } from "./../../../../../assets/svg/ShowFullScreen";
import { DeleteIcon } from "./../../../../../assets/svg/DeleteIcon";
import {
  useDeletePostMutation,
  useGetAllPostsQuery,
  useSavePostMutation,
} from "../../../../../features/api/authApi";
import { saveAs } from "file-saver";
import { ScaleLoader } from "react-spinners";
import { useSelector } from "react-redux";

const PostMenus = ({
  setIsPostMenuVisible,
  postUserId,
  userInfo,
  postImages,
  postId,
  isPostSave,
  refetchReacts,
}) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const postMenuRef = useRef(null);
  const [isPostByUser, setIsPostByUser] = useState(postUserId === userInfo.id);
  OutSideClick(postMenuRef, () => {
    setIsPostMenuVisible(false);
  });
  const {
    data: allPostData,
    error: errorWhenLoadData,
    isLoading,
    isFetching,
    refetch: refetchPost,
  } = useGetAllPostsQuery();
  const [
    savePost,
    {
      data: savePostDate,
      error: errorSavePost,
      isLoading: isLoadingSavePost,
      isSuccess: isSuccessSavePost,
      isError: isErrorSavePost,
      isUninitialized: isUninitializedSavePost,
      status: statusSavePost,
      reset: resetSavePost,
    },
  ] = useSavePostMutation();
  const [
    deletePost,
    {
      isLoading: isDeletePostLoading,
      isSuccess: isDeletePostSuccess,
      isError: isDeletePostError,
      error: deletePostError,
      reset: resetDeletePost,
    },
  ] = useDeletePostMutation();

  const handleSavePost = () => {
    savePost(postId);
    refetchReacts();
    setIsPostMenuVisible(false);
  };

  const handleImageDownload = () => {
    postImages.map((image) => {
      saveAs(image.url, "image.jpg");
    });
    setIsPostMenuVisible(false);
  };
  const handleDeletePost = () => {
    deletePost(postId);
    refetchReacts();
    setTimeout(() => {
      setIsPostMenuVisible(false);
      refetchPost();
    }, isDeletePostLoading);
  };

  return (
    <>
      <div
        ref={postMenuRef}
        className={`w-96 py-3 rounded-md overflow-hidden shadow-md absolute top-10 right-0 z-50 ${
          themeMode === "dark" ? "bg-secondary-bg" : "bg-white-color-100"
        }`}
      >
        {isPostByUser && <MenuItem icon={PinPost} title={"Pin Post"} />}
        <div onClick={() => handleSavePost()}>
          <MenuItem
            icon={SavePost}
            title={isPostSave ? "Unsave Post" : "Save Post"}
          />
        </div>
        {isPostByUser && <MenuItem icon={EditPost} title={"Edit Post"} />}
        {postImages?.length > 0 && (
          <div onClick={() => handleImageDownload()}>
            <MenuItem icon={Download} title={"Download"} />
          </div>
        )}
        {postImages?.length > 0 && (
          <MenuItem icon={ShowFullScreen} title={"ShowFullScreen"} />
        )}
        {isPostByUser && (
          <div onClick={() => handleDeletePost()}>
            {isDeletePostLoading ? (
              <div>
                <ScaleLoader height={16} color={"#1fa0ef"} />
              </div>
            ) : (
              <MenuItem icon={DeleteIcon} title={"Delete Post"} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PostMenus;
