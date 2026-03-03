import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import Feeling from "../../../../assets/svg/Feeling";
import { postBackground } from "./postBackground";
import { IoBanOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const EmojiPickers = ({
  text,
  setText,
  textRef,
  changePart,
  background,
  setBackground,
}) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [isShowBackground, setIsShowBackground] = useState(false);
  const bgRef = useRef(null);

  const handleEmoji = ({ emoji }, e) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
    textRef.current.focus();
  }, [cursorPosition]);

  const handleBackground = (index) => {
    bgRef.current.style.backgroundImage = `url(${postBackground[index]})`;
    bgRef.current.classList.add("bgPost");
    setBackground(postBackground[index]);
    textRef.current.focus();
  };
  const handleRemoveBackground = () => {
    bgRef.current.style.backgroundImage = "";
    bgRef.current.classList.remove("bgPost");
    setBackground("");
    textRef.current.focus();
  };

  return (
    <>
      <div className={`${changePart ? "flex justify-between mt-5" : "mt-5"}`}>
        <div
          className={`${changePart ? "w-9/10" : "w-full"}  mb-4`}
          ref={bgRef}
        >
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            ref={textRef}
            maxLength={1000}
            placeholder="Post Text Here"
            className={`${
              changePart ? "w-9/10" : "w-full"
            } outline-none p-2 font-Gilroy-Medium text-base placeholder:text-black-color text-black-color  bg-transparent`}
            style={{
              paddingTop: `${
                background
                  ? Math.abs(textRef.current.value.length * 0.1 - 25)
                  : "0"
              }%`,
            }}
          />
        </div>
        {changePart && (
          <div className="relative">
            <div
              className="cursor-pointer text-black-color"
              onClick={() => setPicker((prev) => !prev)}
            >
              <Feeling />
            </div>
            <div className="absolute right-8 top-0 z-20">
              {picker && (
                <EmojiPicker
                  theme={themeMode === "dark" ? "dark" : "light"}
                  onEmojiClick={handleEmoji}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {!changePart && (
        <div className="flex justify-between items-center mb-3">
          <div className="flex justify-center items-center gap-1">
            <div
              className="w-10 h-10 bg-gradient-to-r from-cyan-color-100 to-purple-color-100 rounded-md cursor-pointer"
              onClick={() => setIsShowBackground((prev) => !prev)}
            ></div>
            {isShowBackground && (
              <>
                <div
                  className="w-10 h-10 bg-white-color-100 border border-line-color rounded-md cursor-pointer flex justify-center items-center"
                  onClick={handleRemoveBackground}
                >
                  <IoBanOutline className="text-4xl" />
                </div>
                {postBackground.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    alt="Post Background."
                    onClick={() => handleBackground(index)}
                    className="w-10 h-10 object-cover rounded-md cursor-pointer"
                  />
                ))}
              </>
            )}
          </div>
          <div className="relative">
            <div
              className="cursor-pointer text-black-color"
              onClick={() => setPicker((prev) => !prev)}
            >
              <Feeling />
            </div>
            <div className="absolute right-8 bottom-0">
              {picker && (
                <EmojiPicker
                  theme={themeMode === "dark" ? "dark" : "light"}
                  onEmojiClick={handleEmoji}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmojiPickers;
