import React, { useEffect, useState } from "react";
import { JobIcon } from "./../../../assets/svg/JobIcon";
import { SlLocationPin } from "react-icons/sl";
import { IoHomeOutline } from "react-icons/io5";
import { LearningIcon } from "./../../../assets/svg/LearningIcon";
import { LoveIcon } from "./../../../assets/svg/LoveIcon";
import { InstagramIcon } from "./../../../assets/svg/InstagramIcon";
import EditBioText from "./EditBioText";
import { useUpdateUserProfileInfoDetailsMutation } from "../../../features/api/authApi";
import EditDetails from "./EditDetails";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInUsers } from "../../../features/users/authSlice";

const UserProfileInfoOptions = ({ profile, visitor, userInfo }) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const [userProfileBio, setUserProfileBio] = useState(null);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const [userProfileInfos, setUserProfileInfos] = useState({
    bio: profile?.bio || "",
    otherName: profile?.otherName || "",
    currentCity: profile?.currentCity || "",
    job: profile?.job || "",
    workplace: profile?.workplace || "",
    college: profile?.college || "",
    highschool: profile?.highschool || "",
    hometown: profile?.hometown || "",
    relationship: profile?.relationship || "",
    instagram: profile?.instagram || "",
  });
  const [isShowBio, setIsShowBio] = useState(false);
  const [maxTextLength, setMaxTextLength] = useState(100);

  const [updateUserProfileInfoDetails] =
    useUpdateUserProfileInfoDetailsMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserProfileInfos(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfileInfos({ ...userProfileInfos, [name]: value });
    setMaxTextLength(100 - Number(value.length));
  };

  const handleProfileInfosDetails = async () => {
    try {
      setLoading(true);
      const result = await updateUserProfileInfoDetails({
        userProfileInfos,
      }).unwrap();
      console.log(result);
      setUserProfileInfos((prev) => ({
        ...prev,
        ...result,
      }));
      dispatch(LoggedInUsers({ ...userInfo, sortName: result?.otherName }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userInfo, sortName: result?.otherName })
      );
      setIsShowBio(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="font-Gilroy-Bold text-base text-black-color capitalize">
        User Profile Info Details
      </h3>
      <div>
        <div>
          {userProfileInfos?.bio && !isShowBio && (
            <p className="font-Gilroy-Regular text-base text-center text-secondary-color">
              {userProfileInfos?.bio}
            </p>
          )}
          {isShowBio && (
            <div className="my-3">
              <EditBioText
                userProfileInfos={userProfileInfos}
                setUserProfileInfos={setUserProfileInfos}
                setIsShowBio={setIsShowBio}
                handleChange={handleChange}
                name={"bio"}
                maxTextLength={maxTextLength}
                setMaxTextLength={setMaxTextLength}
                handleProfileInfosDetails={handleProfileInfosDetails}
                profile={profile}
                loading={loading}
                placeholder={"Please Add your Bio text here."}
              />
            </div>
          )}
          {!visitor && !isShowBio && (
            <button
              onClick={() => setIsShowBio(true)}
              className={`w-full btn btnSecondary my-2 text-black-color ${
                themeMode === "dark" ? "bg-white-color" : "bg-white-color-100"
              } border-line-color`}
            >
              {userProfileInfos?.bio ? "Edit Bio" : "Add Bio"}
            </button>
          )}
        </div>
        <ul>
          <li className="flex justify-start items-center gap-x-2 font-Gilroy-Medium text-sm text-secondary-color py-1">
            <div>
              <JobIcon />
            </div>
            <div>
              {userProfileInfos?.job && userProfileInfos?.workplace ? (
                <span>
                  Work as a <b>{userProfileInfos?.job}</b> at{" "}
                  <b>{userProfileInfos?.workplace}</b>
                </span>
              ) : userProfileInfos?.job && !userProfileInfos?.workplace ? (
                <span>
                  Work as a <b>{userProfileInfos?.job}</b>
                </span>
              ) : !userProfileInfos?.job && userProfileInfos?.workplace ? (
                <span>Work at {userProfileInfos?.workplace}</span>
              ) : (
                <span>Add Job & Workplace</span>
              )}
            </div>
          </li>
          <li className="flex justify-start items-center gap-x-2 font-Gilroy-Medium text-sm text-secondary-color py-1">
            <div>
              <SlLocationPin className="text-xl" />
            </div>
            <div>
              {userProfileInfos?.currentCity ? (
                <span>
                  Lives in <b>{userProfileInfos?.currentCity}</b>
                </span>
              ) : (
                <span>Add Current City.</span>
              )}
            </div>
          </li>
          <li className="flex justify-start items-center gap-x-2 font-Gilroy-Medium text-sm text-secondary-color py-1">
            <div>
              <IoHomeOutline />
            </div>
            <div>
              {userProfileInfos?.hometown ? (
                <span>
                  From <b>{userProfileInfos?.hometown}</b>
                </span>
              ) : (
                <span>Add Home Town.</span>
              )}
            </div>
          </li>
          <li className="flex justify-start items-center gap-x-2 font-Gilroy-Medium text-sm text-secondary-color py-1">
            <div>
              <LearningIcon />
            </div>
            <div>
              {userProfileInfos?.college ? (
                <span>
                  Study at <b>{userProfileInfos?.college}</b>
                </span>
              ) : (
                <span>Add College.</span>
              )}
            </div>
          </li>
          <li className="flex justify-start items-center gap-x-2 font-Gilroy-Medium text-sm text-secondary-color py-1">
            <div>
              <LearningIcon />
            </div>
            <div>
              {userProfileInfos?.highschool ? (
                <span>
                  Study at <b>{userProfileInfos?.highschool}</b>
                </span>
              ) : (
                <span>Add High School.</span>
              )}
            </div>
          </li>
          <li className="flex justify-start items-center gap-x-2 font-Gilroy-Medium text-sm text-secondary-color py-1">
            <div>
              <LoveIcon />
            </div>
            <div>
              {userProfileInfos?.relationship ? (
                <span>
                  <b>{userProfileInfos?.relationship}</b>
                </span>
              ) : (
                <span>Relationship Status.</span>
              )}
            </div>
          </li>
          <li className="flex justify-start items-center gap-x-2 font-Gilroy-Medium text-sm text-secondary-color py-1">
            <div>
              <InstagramIcon />
            </div>
            <div>
              {userProfileInfos?.instagram ? (
                <span>
                  <b>{userProfileInfos?.instagram}</b>
                </span>
              ) : (
                <span>Add your Instagram link if any.</span>
              )}
            </div>
          </li>
        </ul>
        {!visitor && (
          <div className="mt-2">
            <button
              onClick={() => setVisible(true)}
              className={`w-full btn btnSecondary my-2 text-black-color ${
                themeMode === "dark" ? "bg-white-color" : "bg-white-color-100"
              } border-line-color`}
            >
              {!userProfileInfos?.college &&
              !userProfileInfos?.currentCity &&
              !userProfileInfos?.highschool &&
              !userProfileInfos?.hometown &&
              !userProfileInfos?.instagram &&
              !userProfileInfos?.job &&
              !userProfileInfos?.otherName &&
              !userProfileInfos?.relationship &&
              !userProfileInfos?.workplace
                ? "Add Details"
                : "Edit Details"}
            </button>
          </div>
        )}
        {!visitor && visible && (
          <EditDetails
            userProfileInfos={userProfileInfos}
            setUserProfileInfos={setUserProfileInfos}
            visible={visible}
            setVisible={setVisible}
            maxTextLength={maxTextLength}
            setMaxTextLength={setMaxTextLength}
            handleProfileInfosDetails={handleProfileInfosDetails}
            handleChange={handleChange}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
    </>
  );
};

export default UserProfileInfoOptions;
