import React, { useCallback, useEffect, useRef, useState } from "react";
import { CameraIcon } from "../../../assets/svg/CameraIcon";
import { MediaIcon } from "../../../assets/svg/MediaIcon";
import { UploadIcon } from "../../../assets/svg/UploadIcon";
import OutSideClick from "../../../functions/OutSideClick";
import defaultCover from "../../../assets/defaultImage/defaultcover.jpg";
import PostError from "../../homeComponents/middlePart/createPostPopup/PostError";
import Cropper from "react-easy-crop";
import getCroppedImage from "../../../functions/getCroppedImage";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreatePostMutation,
  useUploadCoverPhotoMutation,
  useUploadImageMutation,
} from "../../../features/api/authApi";
import { LoggedInUsers } from "../../../features/users/authSlice";
import { ScaleLoader } from "react-spinners";
import OldCoverPhoto from "./OldCoverPhoto";

const CoverPhoto = ({
  coverImage,
  visitor,
  selectedCoverImage,
  setSelectedCoverImage,
  setIsOldCoverPhotoShow,
}) => {
  const { userInfo } = useSelector((stat) => stat.userInformation);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isShowOption, setIsShowOption] = useState(false);
  const [coverPageWidth, setCoverPageWidth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [uploadImage] = useUploadImageMutation();
  const [createPost] = useCreatePostMutation();
  const [uploadCoverPhoto] = useUploadCoverPhotoMutation();
  const dispatch = useDispatch();

  const showOption = useRef(null);
  const chooseCover = useRef(null);
  const coverWidth = useRef(null);
  const CoverPhotoRef = useRef(null);

  OutSideClick(showOption, () => {
    setIsShowOption(false);
  });

  // Image Validation
  const handleImageUpload = (e) => {
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
        setSelectedCoverImage(readerImage.target.result);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCoverPageWidth(coverWidth.current.clientWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle Cover Photo function
  const handleCoverPhoto = async () => {
    try {
      setLoading(true);
      let image = await getCroppedImage(selectedCoverImage, croppedAreaPixels);
      let blob = await fetch(image).then((b) => b.blob());
      const path = `${userInfo.username.replace(/\s+/g, "_")}/cover_photos`;
      const formData = new FormData();
      formData.append("path", path);
      formData.append("file", blob);
      const responseCoverPhoto = await uploadImage({
        formData,
        path,
      }).unwrap();
      const coverProfile = await uploadCoverPhoto({
        url: responseCoverPhoto[0].url,
      }).unwrap();
      if (coverProfile?.status === "done") {
        const coverPhotoPost = await createPost({
          type: "cover",
          images: responseCoverPhoto,
          text: null,
          background: null,
          userId: userInfo.id,
          loginRefreshToken: userInfo.loginRefreshToken,
        }).unwrap();
        if (coverPhotoPost?.status === "done") {
          CoverPhotoRef.current.src = `${responseCoverPhoto[0].url}`;
          setSelectedCoverImage("");

          // Upload in LocalStorage
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...userInfo,
              cover: responseCoverPhoto[0].url,
            })
          );
          // Upload in Redux
          dispatch(
            LoggedInUsers({
              ...userInfo,
              cover: responseCoverPhoto[0].url,
            })
          );
        }
      }
    } catch (error) {
    } finally {
      setIsShowOption(false);
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="w-full h-auto md:h-96 bg-white-color-100 rounded-t-md relative"
        ref={coverWidth}
      >
        {error && (
          <div className="w-full h-auto md:h-full bg-blur-color-white-80 absolute left-0 top-0 z-20">
            <PostError error={error} setError={setError} />
          </div>
        )}
        <img
          src={coverImage || defaultCover}
          className="w-full h-full object-cover"
          alt="Cover Photo"
          ref={CoverPhotoRef}
        />
        <input
          type="file"
          hidden
          ref={chooseCover}
          onChange={handleImageUpload}
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="border bg-amber-700"
        />
        {selectedCoverImage && (
          <div className="cropper_cropper">
            <Cropper
              image={selectedCoverImage}
              crop={crop}
              zoom={zoom}
              aspect={coverPageWidth / 384}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              objectFit="horizontal-cover"
            />
          </div>
        )}
        {!visitor && !selectedCoverImage && (
          <div className=" absolute right-2 top-2 lg:right-5 lg:top-5">
            <div
              onClick={() => setIsShowOption((prev) => !prev)}
              className="bg-white-color text-black-color px-3 py-1 lg:px-5 lg:py-3 box-border rounded-md inline-flex justify-start items-center gap-x-2 cursor-pointer"
            >
              <CameraIcon />
              <span className="font-Gilroy-Regular text-sm text-black-color">
                Edit Photo
              </span>
            </div>
            <div ref={showOption}>
              {isShowOption && (
                <ul className="w-60 bg-white-color box-border shadow-md rounded-md absolute top-11 right-0 overflow-hidden">
                  <li
                    onClick={() => setIsOldCoverPhotoShow(true)}
                    className="flex justify-start items-center gap-x-2 cursor-pointer px-3 py-1 lg:px-5 lg:py-2 group hover:bg-secondary-bg hover:text-white-color transition ease-linear duration-150"
                  >
                    <MediaIcon />
                    <span className="font-Gilroy-Regular text-sm text-black-color group-hover:text-white-color transition ease-linear duration-150">
                      Choose File
                    </span>
                  </li>
                  <li
                    onClick={() => chooseCover.current.click()}
                    className="flex justify-start items-center gap-x-2 cursor-pointer px-5 py-2 group hover:bg-secondary-bg hover:text-white-color transition ease-linear duration-150"
                  >
                    <UploadIcon />
                    <span className="font-Gilroy-Regular text-sm text-black-color group-hover:text-white-color transition ease-linear duration-150">
                      Upload Photo
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
        {selectedCoverImage && (
          <div className="w-full p-3 absolute top-0 left-0 flex justify-end items-center gap-x-3">
            <button
              onClick={() => handleCoverPhoto()}
              disabled={loading}
              className={`w-24 bg-blue-color font-Gilroy-Bold text-lg text-white capitalize px-4 py-2 rounded-md transition-all ease-linear duration-200 ${
                loading
                  ? "flex justify-center items-center cursor-not-allowed"
                  : "hover:bg-green-color cursor-pointer"
              }`}
            >
              {loading ? <ScaleLoader height={22} color={"#fff"} /> : "Save"}
            </button>
            <button
              onClick={() => setSelectedCoverImage("")}
              className={`w-24 bg-yellow-color hover:bg-red-color cursor-pointer font-Gilroy-Bold text-lg text-white capitalize px-4 py-2 rounded-md transition-all ease-linear duration-200`}
            >
              cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CoverPhoto;
