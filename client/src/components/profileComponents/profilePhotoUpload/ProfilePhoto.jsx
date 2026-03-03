import React, { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../../../assets/svg/CrossIcon";
import OutSideClick from "../../../functions/OutSideClick";
import { PlusIcon } from "./../../../assets/svg/PlusIcon";
import ProfilePhotoUpload from "./ProfilePhotoUpload";
import { useSelector } from "react-redux";
import PostError from "../../homeComponents/middlePart/createPostPopup/PostError";

const ProfilePhoto = ({ visible, setVisible, uploadPhoto, imageData }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [error, setError] = useState("");
  const profilePopUp = useRef(null);
  const chooseFile = useRef(null);
  const { userInfo } = useSelector((stat) => stat.userInformation);

  // Protect Scroll
  useEffect(() => {
    const body = document.body;
    if (visible) {
      // body.classList.add("no-scroll");
      document.body.classList.add("!overflow-hidden");
    } else {
      document.body.classList.remove("!overflow-hidden");
    }
    return () => {
      document.body.classList.remove("!overflow-hidden");
    };
  }, [visible]);

  OutSideClick(profilePopUp, () => {
    setVisible(false);
  });

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
        setSelectedImage(readerImage.target.result);
    }
  };

  return (
    <>
      <div ref={profilePopUp} className="w-full">
        <div className="relative">
          <div
            onClick={() => setVisible(false)}
            className="hover:bg-red-color hover:text-white-color p-1 transition-all ease-linear duration-200 cursor-pointer absolute right-2 top-2"
          >
            <CrossIcon />
          </div>
          <div className="w-full bg-white-color border border-line-color mb-5">
            {error && (
              <div className="border w-full h-96 bg-white-color absolute left-0 top-0">
                <PostError error={error} setError={setError} />
              </div>
            )}
            <div className="border-b border-white-color-100 p-2">
              <h3 className="font-Gilroy-Bold text-lg text-black-color text-center">
                Image Upload
              </h3>
            </div>
          </div>
          <div
            onClick={() => chooseFile.current.click()}
            className="w-40 mx-auto flex justify-center items-center gap-x-1 bg-blue-color text-white-color rounded-md cursor-pointer"
          >
            <PlusIcon />
            <span>Upload Photo</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              ref={chooseFile}
              onChange={handleCommentImageUpload}
              className="hidden"
            />
          </div>
        </div>
        <div className="h-[410px] overflow-y-auto">
          <h5 className="font-Gilroy-Bold text-base text-black-color">
            Total Photos
          </h5>
          <div>
            <span className="font-Gilroy-Medium text-sm text-black-color">
              Profile Photos (
              {
                imageData?.filter(
                  (img) =>
                    img.asset_folder ===
                    `${userInfo.username.replace(/\s+/g, "_")}/profile_photos`
                ).length
              }
              )
            </span>
            <div className="w-full p-1 grid grid-cols-5 gap-1 items-center">
              {imageData
                ?.filter(
                  (img) =>
                    img.asset_folder ===
                    `${userInfo.username.replace(/\s+/g, "_")}/profile_photos`
                )
                .map((item) => (
                  <img
                    key={item.public_id}
                    src={item.secure_url}
                    onClick={() => setSelectedImage(item.secure_url)}
                    className="cursor-pointer"
                  />
                ))}
            </div>
          </div>
          <div>
            <span className="font-Gilroy-Medium text-sm text-black-color">
              Others Photos (
              {
                // imageData?.length
                imageData?.filter(
                  (img) =>
                    img.asset_folder !==
                    `${userInfo.username.replace(/\s+/g, "_")}/profile_photos`
                ).length
              }
              )
            </span>
            <div className="w-full p-1 grid grid-cols-5 gap-1 items-center">
              {imageData
                ?.filter(
                  (img) =>
                    img.asset_folder !==
                    `${userInfo.username.replace(/\s+/g, "_")}/profile_photos`
                )
                .map((item) => (
                  <img
                    key={item.public_id}
                    src={item.secure_url}
                    onClick={() => setSelectedImage(item.secure_url)}
                    className="cursor-pointer"
                  />
                ))}
            </div>
          </div>
        </div>
        {selectedImage && (
          <div>
            <ProfilePhotoUpload
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              visible={visible}
              setVisible={setVisible}
              error={error}
              setError={setError}
              uploadPhoto={uploadPhoto}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePhoto;
