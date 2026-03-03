import React from "react";
import LeftPart from "../homeComponents/leftPart/LeftPart";
import PostHome from "../homeComponents/middlePart/PostHome";
import { Outlet } from "react-router-dom";
import Header from "../homeComponents/middlePart/header/Header";
import RightHome from "../homeComponents/rightPart/RightHome";

const RootLayout = () => {
  return (
    <>
      {/* <div className="mx-auto ml-2 mr-2 xl:mx-20 grid grid-cols-5 mt-5"> */}
      <div className="mx-auto ml-2 mr-2 xl:mx-10 2xl:mx-20 grid lg:grid-cols-14 xl:grid-cols-5 gap-x-2 mt-5">
        <div className="col-span-1 hidden lg:block sticky top-5 left-0 h-[calc(100vh-60px)]">
          <LeftPart />
        </div>
        <div className="col-span-4 lg:col-span-13 xl:col-span-3">
          <div className="sticky top-0 left-0 z-50">
            <Header />
          </div>
          <Outlet />
        </div>
        <div className="col-span-1 lg:col-span-5 xl:col-span-1 hidden xl:block sticky top-5 right-0 h-[calc(100vh-60px)]">
          <RightHome />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
