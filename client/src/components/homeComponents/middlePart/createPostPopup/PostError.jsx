import React from "react";
import { CrossIcon } from "../../../../assets/svg/CrossIcon";

const PostError = ({ error, setError }) => {
  return (
    <>
      <div className="h-full flex justify-center items-center">
        <div className="">
          <div
            onClick={() => setError("")}
            className="hover:bg-red-color hover:text-white-color p-1 transition-all ease-linear duration-200 cursor-pointer absolute right-2 top-2 border"
          >
            <CrossIcon />
          </div>
          <h1 className="font-Gilroy-Bold text-2xl text-red-color capitalize text-center tracking-wide">
            {error}
          </h1>
          <div className="text-center mt-2">
            <button
              onClick={() => setError("")}
              className="px-3 py-2 rounded-md font-Gilroy-Medium text-xl tracking-wider uppercase text-black-color border border-black-color cursor-pointer hover:border-green-color hover:bg-green-color hover:text-black-color transition-all ease-linear duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostError;
