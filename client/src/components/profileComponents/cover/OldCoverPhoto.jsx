import React from "react";
import { CrossIcon } from "../../../assets/svg/CrossIcon";

const OldCoverPhoto = ({
  isOldCoverPhotoShow,
  setIsOldCoverPhotoShow,
  setSelectedCoverImage,
  imageData,
  userInfo,
}) => {
  const handleClickForChoosePhoto = (item) => {
    setSelectedCoverImage(item.secure_url);
    setIsOldCoverPhotoShow(false);
  };
  return (
    <>
      <div className="w-screen h-screen bg-blur-color-white-80 flex justify-center items-center fixed top-0 left-0 z-20">
        <div className="bg-primary-bg py-5 pe-1 rounded-md">
          <div className="w-[1200px] h-[700px] pl-8 pe-9 overflow-y-auto">
            <h5 className="font-Gilroy-Bold text-xl text-black-color">
              Total Photos
            </h5>
            <div>
              {/* show cover Photos */}
              <div>
                <span className="font-Gilroy-Medium text-lg text-black-color">
                  Cover Photos (
                  {
                    imageData?.filter(
                      (img) =>
                        img.asset_folder ===
                        `${userInfo.username.replace(/\s+/g, "_")}/cover_photos`
                    ).length
                  }
                  )
                </span>
                <div className="p-3 rounded-md grid grid-cols-5 gap-3 items-center">
                  {imageData
                    ?.filter(
                      (img) =>
                        img.asset_folder ===
                        `${userInfo.username.replace(/\s+/g, "_")}/cover_photos`
                    )
                    .map((item) => (
                      <img
                        key={item.public_id}
                        src={item.secure_url}
                        onClick={() => handleClickForChoosePhoto(item)}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    ))}
                </div>
              </div>
              {/* Show Other Photo */}
              <div className="mt-5">
                <span className="font-Gilroy-Medium text-lg text-black-color">
                  Others Photos (
                  {
                    // imageData?.length
                    imageData?.filter(
                      (img) =>
                        img.asset_folder !==
                        `${userInfo.username.replace(
                          /\s+/g,
                          "_"
                        )}/profile_photos`
                    ).length
                  }
                  )
                </span>
                <div className="w-full p-1 grid grid-cols-5 gap-1 items-center">
                  {imageData
                    ?.filter(
                      (img) =>
                        img.asset_folder !==
                        `${userInfo.username.replace(
                          /\s+/g,
                          "_"
                        )}/profile_photos`
                    )
                    .map((item) => (
                      <img
                        key={item.public_id}
                        src={item.secure_url}
                        onClick={() => handleClickForChoosePhoto(item)}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OldCoverPhoto;
