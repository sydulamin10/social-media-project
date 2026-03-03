import React, { useEffect, useRef } from "react";
import { ScaleLoader } from "react-spinners";

const EditBioText = ({
  isSelect,
  userProfileInfos,
  setUserProfileInfos,
  setIsShowBio,
  name,
  value,
  maxTextLength,
  setMaxTextLength,
  handleProfileInfosDetails,
  placeholder,
  loading,
  setLoading,
  isVisibleTextArea,
  setIsVisibleTextArea,
  handleChange,
  currentValue,
  setCurrentValue,
  rel,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!isSelect) {
      textareaRef.current.focus();
    }
  }, []);

  const handleCancelling = () => {
    if (isVisibleTextArea) {
      setIsVisibleTextArea(false);
    } else {
      setIsShowBio(false);
    }
  };

  const handleSave = () => {
    if (isVisibleTextArea) {
      setIsVisibleTextArea(false);
    }
    handleProfileInfosDetails();
  };

  console.log(value);
  return (
    <>
      <div className="mx-3">
        {isSelect ? (
          <select
            onChange={handleChange}
            name={name}
            value={value}
            className="w-full font-Gilroy-Medium text-base text-secondary-color outline-none border border-line-color rounded-md"
          >
            <option value="Select Relationship Status">
              Select Relationship Status
            </option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="In A Relationship">In A Relationship</option>
            <option value="It's Complicated">It's Complicated</option>
          </select>
        ) : (
          <>
            <textarea
              value={value}
              onChange={handleChange}
              maxLength={100}
              name={name}
              placeholder={placeholder}
              ref={textareaRef}
              className="w-full h-16 border border-line-color resize-none outline-none p-2 box-border font-Gilroy-Regular text-sm text-secondary-color"
            />
            <p className="font-Gilroy-Thin text-sm text-right text-black-color pr-2">
              {`${maxTextLength} Characters remaining.`}
            </p>
          </>
        )}

        <div className="flex justify-end items-center gap-x-2 my-2 pr-2">
          <button onClick={handleCancelling} className="btn btnSecondary">
            Cancel
          </button>
          <button onClick={() => handleSave()} className="btn btnPrimary">
            {loading ? <ScaleLoader height={16} color={"#1fa0ef"} /> : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditBioText;
