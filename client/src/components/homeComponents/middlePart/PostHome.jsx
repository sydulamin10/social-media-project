import { useRef } from "react";
import { LiveIcon } from "../../../assets/svg/LiveIcon";
import { MediaIcon } from "../../../assets/svg/MediaIcon";
import CreatePostPopup from "./createPostPopup/CreatePostPopup";
import { useSelector } from "react-redux";
import avatar from "/src/assets/defaultImage/avatar.png";

const PostHome = ({ visible, setVisible, posts }) => {
  const { userInfo } = useSelector((stat) => stat.userInformation);
  const themeMode = useSelector((state) => state?.themeMode.mode);

  return (
    <>
      <div className="mt-4 md:mt-10 mx-3">
        <div
          className={`p-4 md:px-6 md:py-10 ${
            themeMode === "dark" ? "bg-[#2d2d2d]" : "bg-line-color"
          } rounded-md`}
        >
          <div
            className={`flex justify-start items-center gap-x-2 bg-main-bg p-2 rounded-full`}
          >
            <div className="w-12 h-12 bg-secondary-color rounded-full overflow-hidden">
              <img
                src={userInfo?.profilePicture || avatar}
                alt=""
                className="rounded-full"
              />
            </div>
            <input
              onFocus={() => setVisible(true)}
              type="text"
              placeholder="Post Text Here"
              className="w-[95%] focus:outline-none placeholder:text-black-color text-black-color"
            />
          </div>
          <div className="border-t border-white-color mt-6 ">
            <div className="flex justify-around items-center mt-6">
              <div
                className={`flex justify-start items-center gap-x-3 cursor-pointer text-black-color`}
              >
                <LiveIcon />
                <span className="font-Gilroy-Medium text-sm md:text-base text-black-color capitalize">
                  Live video
                </span>
              </div>
              <div
                className={`flex justify-start items-center gap-x-3 cursor-pointer text-black-color`}
              >
                <MediaIcon />
                <span className="font-Gilroy-Medium text-sm md:text-base text-black-color capitalize">
                  Image/Gallery
                </span>
              </div>
              <div
                className={`flex justify-start items-center gap-x-3 cursor-pointer text-black-color`}
              >
                <LiveIcon />
                <span className="font-Gilroy-Medium text-sm md:text-base text-black-color capitalize">
                  Activities
                </span>
              </div>
            </div>
          </div>
        </div>
        {visible && (
          <CreatePostPopup visible={visible} setVisible={setVisible} />
        )}
      </div>
    </>
  );
};

export default PostHome;
