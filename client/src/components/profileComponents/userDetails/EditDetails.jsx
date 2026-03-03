import React, { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../../../assets/svg/CrossIcon";
import Details from "./Details";
import { JobIcon } from "../../../assets/svg/JobIcon";
import { IoHomeOutline } from "react-icons/io5";
import { LearningIcon } from "../../../assets/svg/LearningIcon";
import { CircleProfileIcon } from "./../../../assets/svg/CircleProfileIcon";
import { LoveIcon } from "../../../assets/svg/LoveIcon";
import { InstagramIcon } from "../../../assets/svg/InstagramIcon";
import OutSideClick from "../../../functions/OutSideClick";

const EditDetails = ({
  visible,
  setVisible,
  maxTextLength,
  setMaxTextLength,
  userProfileInfos,
  setUserProfileInfos,
  handleProfileInfosDetails,
  handleChange,
  loading,
  setLoading,
}) => {
  const detailsRef = useRef(null);

  // Protect Scroll
  useEffect(() => {
    const body = document.body;
    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [visible]);

  OutSideClick(detailsRef, () => {
    setVisible(false);
  });
  return (
    <>
      <div className="w-full h-screen bg-blur-color-white-80 fixed top-0 left-0 flex justify-center items-center z-50">
        <div
          className="w-9/10 md:w-1/3 bg-white shadow-md relative rounded-md"
          ref={detailsRef}
        >
          <div className="border-b border-white-color-100 p-2 relative">
            <h3 className="font-Gilroy-Bold text-base md:text-lg text-black-color text-center">
              Edit Bio Details
            </h3>
            <div
              onClick={() => setVisible(false)}
              className="hover:bg-red-color hover:text-white-color p-1 transition-all ease-linear duration-200 cursor-pointer absolute right-2 top-2"
            >
              <CrossIcon />
            </div>
          </div>
          <div className="mt-2">
            <div>
              <h3 className="font-Gilroy-Bold text-base md:text-lg text-black-color px-3 capitalize">
                Other name
              </h3>

              <div>
                <Details
                  text={"OtherName"}
                  name={"otherName"}
                  placeholder={"Add OtherName"}
                  maxTextLength={maxTextLength}
                  setMaxTextLength={setMaxTextLength}
                  setUserProfileInfos={setUserProfileInfos}
                  value={userProfileInfos?.otherName}
                  icon={<CircleProfileIcon />}
                  handleProfileInfosDetails={handleProfileInfosDetails}
                  handleChange={handleChange}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            </div>
            <div>
              <h3 className="font-Gilroy-Bold text-base md:text-lg text-black-color px-3 capitalize">
                Job and Workplace
              </h3>
              <div>
                <Details
                  text={"Job"}
                  name={"job"}
                  placeholder={"Add Job"}
                  maxTextLength={maxTextLength}
                  setMaxTextLength={setMaxTextLength}
                  setUserProfileInfos={setUserProfileInfos}
                  value={userProfileInfos?.job}
                  icon={<JobIcon />}
                  handleProfileInfosDetails={handleProfileInfosDetails}
                  handleChange={handleChange}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
              <div>
                <Details
                  text={"Workplace"}
                  name={"workplace"}
                  placeholder={"Add Workplace"}
                  maxTextLength={maxTextLength}
                  setMaxTextLength={setMaxTextLength}
                  setUserProfileInfos={setUserProfileInfos}
                  value={userProfileInfos?.workplace}
                  icon={<JobIcon />}
                  handleProfileInfosDetails={handleProfileInfosDetails}
                  handleChange={handleChange}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            </div>
            <div>
              <h3 className="font-Gilroy-Bold text-base md:text-lg text-black-color px-3 capitalize">
                Current city
              </h3>
              <div>
                <Details
                  text={"current City"}
                  name={"currentCity"}
                  placeholder={"Add Current City"}
                  maxTextLength={maxTextLength}
                  setMaxTextLength={setMaxTextLength}
                  setUserProfileInfos={setUserProfileInfos}
                  value={userProfileInfos?.currentCity}
                  icon={<JobIcon />}
                  handleProfileInfosDetails={handleProfileInfosDetails}
                  handleChange={handleChange}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            </div>
            <div>
              <h3 className="font-Gilroy-Bold text-base md:text-lg text-black-color px-3 capitalize">
                Home Town
              </h3>
              <div>
                <Details
                  text={"Home Town"}
                  name={"hometown"}
                  placeholder={"Add Home Town"}
                  maxTextLength={maxTextLength}
                  setMaxTextLength={setMaxTextLength}
                  setUserProfileInfos={setUserProfileInfos}
                  value={userProfileInfos?.hometown}
                  icon={<IoHomeOutline />}
                  handleProfileInfosDetails={handleProfileInfosDetails}
                  handleChange={handleChange}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            </div>
            <div>
              <h3 className="font-Gilroy-Bold text-base md:text-lg text-black-color px-3 capitalize">
                Education
              </h3>
              <div>
                <Details
                  text={"High School"}
                  name={"highschool"}
                  placeholder={"Add High School"}
                  maxTextLength={maxTextLength}
                  setMaxTextLength={setMaxTextLength}
                  setUserProfileInfos={setUserProfileInfos}
                  value={userProfileInfos?.highschool}
                  icon={<LearningIcon />}
                  handleProfileInfosDetails={handleProfileInfosDetails}
                  handleChange={handleChange}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
              <div>
                <Details
                  text={"College"}
                  name={"college"}
                  placeholder={"Add College"}
                  maxTextLength={maxTextLength}
                  setMaxTextLength={setMaxTextLength}
                  setUserProfileInfos={setUserProfileInfos}
                  value={userProfileInfos?.college}
                  icon={<LearningIcon />}
                  handleProfileInfosDetails={handleProfileInfosDetails}
                  handleChange={handleChange}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
              <div>
                <h3 className="font-Gilroy-Bold text-base md:text-lg text-black-color px-3 capitalize">
                  Relationship Status
                </h3>
                <Details
                  text={"relationship Status"}
                  name={"relationship"}
                  placeholder={"Add Relationship Status"}
                  maxTextLength={maxTextLength}
                  setMaxTextLength={setMaxTextLength}
                  setUserProfileInfos={setUserProfileInfos}
                  value={userProfileInfos?.relationship}
                  icon={<LoveIcon />}
                  handleProfileInfosDetails={handleProfileInfosDetails}
                  handleChange={handleChange}
                  isSelect
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
              <div>
                <h3 className="font-Gilroy-Bold text-base md:text-lg text-black-color px-3 capitalize">
                  Social Media
                </h3>
                <Details
                  text={"instagram"}
                  name={"instagram"}
                  placeholder={"Add Instagram link if any"}
                  maxTextLength={maxTextLength}
                  setMaxTextLength={setMaxTextLength}
                  setUserProfileInfos={setUserProfileInfos}
                  value={userProfileInfos?.instagram}
                  icon={<InstagramIcon />}
                  handleProfileInfosDetails={handleProfileInfosDetails}
                  handleChange={handleChange}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDetails;
