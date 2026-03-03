import React, { useEffect, useRef, useState } from "react";
import { PlusIcon } from "../../../assets/svg/PlusIcon";
import EditBioText from "./EditBioText";
import { EditPost } from "./../../../assets/svg/EditPost";

const Details = ({
  text,
  name,
  placeholder,
  maxTextLength,
  setMaxTextLength,
  value,
  setUserProfileInfos,
  icon,
  handleProfileInfosDetails,
  handleChange,
  isSelect,
  loading,
  setLoading,
}) => {
  const textareaRef = useRef(null);
  const [isVisibleTextArea, setIsVisibleTextArea] = useState(false);

  const Icon = () => {
    return icon;
  };

  const handleClick = () => {
    setIsVisibleTextArea((prev) => !prev);
  };

  return (
    <>
      <div
        className={`${
          !isVisibleTextArea &&
          "hover:bg-line-color transition ease-linear duration-150"
        }`}
      >
        {value ? (
          <div
            onClick={handleClick}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="flex justify-start items-center gap-x-1 text-secondary-color px-3 pb-3">
              <Icon />
              <span className="font-Gilroy-Medium text-sm md:text-base text-secondary-color">
                {value}
              </span>
            </div>
            <div
              onClick={() => setIsVisibleTextArea(true)}
              className="pr-3 cursor-pointer"
            >
              <EditPost />
            </div>
          </div>
        ) : (
          <div
            onClick={handleClick}
            className="flex justify-start items-center gap-x-1 text-secondary-color px-3 pb-3 cursor-pointer"
          >
            <PlusIcon />
            <span className="font-Gilroy-Medium text-sm md:text-base text-secondary-color capitalize">
              Add {text}
            </span>
          </div>
        )}
        {isVisibleTextArea && (
          <EditBioText
            placeholder={placeholder}
            maxTextLength={maxTextLength}
            setMaxTextLength={setMaxTextLength}
            setUserProfileInfos={setUserProfileInfos}
            name={name}
            value={value}
            isVisibleTextArea={isVisibleTextArea}
            setIsVisibleTextArea={setIsVisibleTextArea}
            handleProfileInfosDetails={handleProfileInfosDetails}
            handleChange={handleChange}
            isSelect={isSelect}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
    </>
  );
};

export default Details;
