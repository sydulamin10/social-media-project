import React from "react";

const LeftAuth = ({ icon, title, description }) => {
  return (
    <>
      <span className={``}>{icon}</span>
      <h1
        className={`font-Gilroy-Bold text-2xl lg:text-4xl 2xl:text-7xl text-primary-color`}
      >
        {title}
      </h1>
      <p
        className={`font-Gilroy-Regular text-base 2xl:text-lg text-black-color text-justify mt-3`}
      >
        {description}
      </p>
    </>
  );
};

export default LeftAuth;
