import React from "react";
import { reactsEmoji } from "./reactsEmoji";

const Reacts = ({ width = "50px", height = "50px", handleReacts }) => {
  return (
    <>
      <div className="w-[315px] bg-line-color flex justify-center items-center rounded-full">
        {reactsEmoji.map((item, index) => (
          <img
            key={index}
            src={item.url}
            style={{ width: width, height: height }}
            className="hover:scale-[1.3] transition ease-linear duration-300"
            onClick={() => handleReacts(item.name)}
          />
        ))}
      </div>
    </>
  );
};

export default Reacts;
