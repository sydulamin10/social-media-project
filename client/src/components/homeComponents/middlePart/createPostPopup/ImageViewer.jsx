import React, { useRef } from "react";
import EmojiPickers from "./EmojiPickers";
import { CrossIcon } from "../../../../assets/svg/CrossIcon";
import { MediaIcon } from "../../../../assets/svg/MediaIcon";
import { useSelector } from "react-redux";

const ImageViewer = ({
  text,
  setText,
  textRef,
  image,
  setImage,
  setError,
  setIsShowImageViewer,
}) => {
  const themeMode = useSelector((state) => state?.themeMode.mode);
  const chooseFile = useRef(null);
  const handleImageUpload = (e) => {
    let file = Array.from(e.target.files);
    file.forEach((image) => {
      if (
        image.type !== "image/jpeg" &&
        image.type !== "image/png" &&
        image.type !== "image/webp" &&
        image.type !== "image/gif"
      ) {
        file = file.filter((item) => item.name !== image.name);
        return setError(
          `${image.name} is unsupported file..! Only (jpeg, png, webp, gif) file formate is supported`
        );
      } else if (image.size > 1024 * 1024 * 5) {
        file = file.filter((item) => item.name !== image.name);
        return setError(
          `${image.name} file size is too large. You must choose file maximum size below 5MB.`
        );
      } else {
        const renderFiles = new FileReader();
        renderFiles.readAsDataURL(image);
        renderFiles.onload = (readerImage) =>
          setImage((images) => [...images, readerImage.target.result]);
      }
    });
  };

  return (
    <>
      <EmojiPickers
        text={text}
        setText={setText}
        textRef={textRef}
        changePart
      />
      <div className="p-4 border border-line-color rounded-md mb-5">
        <div className={`w-full h-[470px] bg-white-color-100 rounded-md`}>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png, image/webp,image/gif"
            className="hidden"
            ref={chooseFile}
            onChange={handleImageUpload}
          />
          {image && image.length ? (
            <div className="h-full relative">
              <div
                onClick={() => chooseFile.current.click()}
                className="flex justify-center items-center gap-1 opacity-60 bg-white-color cursor-pointer absolute left-2 top-2 py-2 px-3 rounded-xl hover:opacity-100 hover:bg-black-color hover:text-white-color-100 transition-all ease-linear duration-200"
              >
                <div className="cursor-pointer flex justify-center items-center">
                  <MediaIcon />
                </div>
                <button className="cursor-pointer">Add more..</button>
              </div>
              <div
                onClick={() => setImage([])}
                className="absolute top-2 right-2 p-1 bg-white-color text-text-color hover:text-white-color hover:bg-red-color transition-all ease-linear duration-200 cursor-pointer z-20"
              >
                <CrossIcon />
              </div>
              <div
                className={`${
                  image.length === 1
                    ? "w-full h-full overflow-hidden rounded-md"
                    : image.length === 2
                    ? "w-full h-full grid grid-cols-2 gap-2 overflow-hidden rounded-md"
                    : image.length === 3
                    ? "w-full h-full grid grid-cols-2 gap-2 overflow-hidden rounded-md"
                    : image.length === 4
                    ? "w-full h-full grid grid-cols-2 gap-2 overflow-hidden rounded-md"
                    : image.length > 4 &&
                      "w-full h-full grid grid-cols-2 gap-2 overflow-hidden rounded-md"
                  // "w-full h-[475px] grid grid-cols-2 gap-2 overflow-hidden rounded-md"
                }`}
              >
                {image.slice(0, 4).map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    alt="Image"
                    className={`"w-full h-full object-cover" ${
                      image.length === 2
                        ? "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-2"
                        : image.length === 3 &&
                          "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3"
                      // : image.length === 4 &&
                      //   "[&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3"
                    }`}
                  />
                ))}
              </div>
              {image.length > 4 && (
                <div className="w-12 h-12 flex justify-center items-center bg-blur-color-white-50 font-Gilroy-Bold text-base text-black absolute right-[21%] bottom-[21%] rounded-full">
                  <span>+{image.length - 4}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full relative flex justify-center items-center">
              <div
                onClick={() => setIsShowImageViewer(false)}
                className="absolute top-2 right-2 p-1 text-secondary-color hover:text-white-color hover:bg-red-color transition-all ease-linear duration-200 cursor-pointer"
              >
                <CrossIcon />
              </div>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => chooseFile.current.click()}
              >
                <div className="w-10 h-10 rounded-full cursor-pointer transition-all ease-linear duration-200 text-black-color hover:bg-black-color hover:text-white-color-100 flex justify-center items-center">
                  <MediaIcon />
                </div>
                <div>
                  <p className=" font-Gilroy-Bold text-base text-center text-black-color">
                    Add Photos/videos
                  </p>
                  <p className=" font-Gilroy-Bold text-base text-center text-black-color">
                    Or drag and drop
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageViewer;
