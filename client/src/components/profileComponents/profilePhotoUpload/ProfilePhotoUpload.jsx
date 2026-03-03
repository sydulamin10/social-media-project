import React, { useCallback, useEffect, useRef, useState } from "react";
import { CrossIcon } from "../../../assets/svg/CrossIcon";
import { PlusIcon } from "../../../assets/svg/PlusIcon";
import Cropper from "react-easy-crop";
import { MinusIcon } from "./../../../assets/svg/MinusIcon";
import getCroppedImage from "../../../functions/getCroppedImage";
import PostError from "./../../homeComponents/middlePart/createPostPopup/PostError";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreatePostMutation,
  useUploadImageMutation,
  useUploadProfilePhotoMutation,
} from "../../../features/api/authApi";
import { LoggedInUsers } from "../../../features/users/authSlice";
import { ScaleLoader } from "react-spinners";

const ProfilePhotoUpload = ({
  selectedImage,
  setSelectedImage,
  visible,
  setVisible,
  error,
  setError,
  uploadPhoto,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [text, setText] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((stat) => stat.userInformation);
  const zoomRange = useRef(null);
  const [uploadImage] = useUploadImageMutation();
  const [createPost] = useCreatePostMutation();
  const [uploadProfilePhoto] = useUploadProfilePhotoMutation();
  const dispatch = useDispatch();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Protect Scroll
  useEffect(() => {
    const body = document.body;
    if (visible) {
      // body.classList.add("no-scroll");
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [visible]);

  const zoomOut = () => {
    zoomRange.current.stepDown();
    setZoom(zoomRange.current.value);
  };
  const zoomIn = () => {
    zoomRange.current.stepUp();
    setZoom(zoomRange.current.value);
  };

  // Image Crop Function
  const getCroppedImageData = useCallback(
    async (show) => {
      try {
        const croppedImage = await getCroppedImage(
          selectedImage,
          croppedAreaPixels
        );
        if (show) {
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setSelectedImage(croppedImage);
        } else {
          return croppedImage;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const handleProfilePhoto = async () => {
    try {
      setLoading(true);
      let image = await getCroppedImage(selectedImage, croppedAreaPixels);
      let blob = await fetch(image).then((b) => b.blob());
      const path = `${userInfo.username.replace(/\s+/g, "_")}/profile_photos`;
      const formData = new FormData();
      formData.append("path", path);
      formData.append("file", blob);
      const responseProfilePhoto = await uploadImage({
        formData,
        path,
      }).unwrap();
      const uploadProfile = await uploadProfilePhoto({
        url: responseProfilePhoto[0].url,
      }).unwrap();
      if (uploadProfile?.status === "done") {
        const profilePhotoPost = await createPost({
          type: "profilePicture",
          images: responseProfilePhoto,
          text,
          background: null,
          userId: userInfo.id,
          loginRefreshToken: userInfo.loginRefreshToken,
        }).unwrap();
        if (profilePhotoPost?.status === "done") {
          setLoading(false);
          uploadPhoto.current.style.backgroundImage = `url(${responseProfilePhoto[0].url})`;

          // Upload in LocalStorage
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...userInfo,
              profilePicture: responseProfilePhoto[0].url,
            })
          );
          // Upload in Redux
          dispatch(
            LoggedInUsers({
              ...userInfo,
              profilePicture: responseProfilePhoto[0].url,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setVisible(false);
    }
  };
  return (
    <>
      <div className="w-[600px] h-[687px] p-3 bg-white-color shadow-md fixed -top-20 left-0 z-50">
        {error && <PostError error={error} setError={setError} />}
        <div className="border-b border-white-color-100 p-2 mb-2 relative">
          <h3 className="font-Gilroy-Bold text-lg text-black-color text-center">
            Upload profile picture
          </h3>
          <div
            className="absolute top-1 right-2 text-secondary-color cursor-pointer"
            onClick={() => setSelectedImage(false)}
          >
            <CrossIcon />
          </div>
        </div>
        {/* Text Area */}
        <div>
          <textarea
            placeholder="Caption"
            onChange={(e) => setText(e.target.value)}
            className="w-full h-16 p-2 bg-transparent resize-none text-black-color rounded-md border border-line-color outline-none font-Gilroy-Regular text-base"
          />
        </div>
        <div className="profile_cropper w-full  h-[400px] flex justify-center items-center relative mt-1">
          <Cropper
            image={selectedImage}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="w-full flex justify-center items-center gap-x-3">
          <div
            onClick={zoomOut}
            className="p-1 rounded-full bg-white-color-100 text-black-color hover:bg-primary-bg hover:text-white-color font-bold cursor-pointer tr transition ease-linear duration-200"
          >
            <MinusIcon />
          </div>
          <input
            type="range"
            onChange={(e) => setZoom(e.target.value)}
            value={zoom}
            min={1}
            max={10}
            step={0.01}
            ref={zoomRange}
            className="w-8/10 customize_range"
          />
          <div
            onClick={zoomIn}
            className="p-1 rounded-full bg-white-color-100 text-black-color hover:bg-primary-bg hover:text-white-color font-bold cursor-pointer tr transition ease-linear duration-200"
          >
            <PlusIcon />
          </div>
        </div>
        <div className="p-2 flex justify-start items-center gap-x-3">
          <button
            disabled={loading}
            onClick={() => getCroppedImageData("show")}
            className="bg-white-color-100 rounded-md px-5 py-2 font-Gilroy-Bold text-base text-black-color"
          >
            Save Crop Image
          </button>
          <button
            disabled={loading}
            onClick={() => handleProfilePhoto()}
            className="bg-white-color-100 rounded-md px-5 py-2 font-Gilroy-Bold text-base text-black-color"
          >
            {loading ? (
              <ScaleLoader height={16} color={"#1fa0ef"} />
            ) : (
              "Upload Image"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePhotoUpload;
