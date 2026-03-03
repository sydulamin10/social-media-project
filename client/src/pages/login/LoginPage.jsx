import React from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import LoginForm from "../../components/authentication/LoginForm";
import LeftAuth from "../../components/authentication/LeftAuth";
import LoginIcon from "./../../assets/svg/LoginIcon";
import { setThemeMode } from "../../features/themes/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Moon } from "../../assets/svg/Moon";

const LoginPage = () => {
  const themeMode = useSelector((state) => state.themeMode.mode);
  const dispatch = useDispatch();
  const handleMode = () => {
    if (themeMode === "light") {
      dispatch(setThemeMode("dark"));
      localStorage.setItem("mode", JSON.stringify("dark"));
    } else if (themeMode === "dark") {
      dispatch(setThemeMode("light"));
      localStorage.setItem("mode", JSON.stringify("light"));
    }
  };
  return (
    <>
      <div className="relative flex justify-center items-center">
        <div className="container">
          <ToastContainer />
          <Helmet>
            <title>Login in Ramen's Social Media</title>
          </Helmet>
          <div className={`relative z-10`}>
            <div
              className={`hidden lg:block w-[500px] h-[500px] bg-purple-100 rounded-full absolute -left-40 -top-40 -z-10`}
            ></div>
            <div
              className={`h-screen container flex justify-center items-center gap-x-6`}
            >
              <div className={`xl:w-[35%] lg:w-[40%] hidden lg:block`}>
                <LeftAuth
                  icon={<LoginIcon />}
                  title="Login for Access"
                  description={`Sign in to your account easily and enjoy secure access to personalized services, features, and saved preferences anytime, anywhere.`}
                />
              </div>
              <div className={`w-full lg:w-[45%] xl:w-[35%]`}>
                <LoginForm toast={toast} />
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => handleMode()}
          className="w-10 h-10 rounded-full bg-white-color-100 flex items-center justify-center mb-3 cursor-pointer hover:bg-black-color hover:text-white-color transition-all ease-linear duration-75 absolute top-10 right-10 z-50"
        >
          <Moon />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
