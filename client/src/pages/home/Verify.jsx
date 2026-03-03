import React from "react";
import { PuffLoader } from "react-spinners";

const Verify = ({ type, head, loading, text }) => {
  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 bg-blur-color-white-80 z-20 flex justify-center items-center">
        <div className="w-[400px] bg-white-color p-4 text-center shadow-lg">
          <h3
            className={`font-Gilroy-Medium  text-lg ${
              type === "success" ? "text-green-color" : "text-red-color"
            }`}
          >
            {head}
          </h3>
          <h5
            className={`font-Gilroy-Medium ${
              type === "success" ? "text-green-color" : "text-red-color"
            } text-lg pt-5`}
          >
            {text}
          </h5>
          <h5 className="font-Gilroy-Medium text-green-color text-lg pt-5">
            {loading}
            <PuffLoader
              size={50}
              color={"green"}
              speedMultiplier={1}
              className="mx-auto"
              loading={loading}
            />
          </h5>
        </div>
      </div>
    </>
  );
};

export default Verify;
