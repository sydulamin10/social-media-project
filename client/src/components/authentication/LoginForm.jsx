import { useState } from "react";
import { Link } from "react-router";
import { Formik, useFormik } from "formik";
import { signIn, signUp } from "../../validation/validation";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {
  useAddUserMutation,
  useLoggedInUserMutation,
} from "../../features/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInUsers } from "../../features/users/authSlice";
const initialState = {
  email: "",
  password: "",
};

const LoginForm = ({ toast }) => {
  const themeMode = useSelector((state) => state?.themeMode?.mode);
  const [loggedInUser, { isLoading }] = useLoggedInUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = async () => {
    const loginMutation = await loggedInUser({
      email: formik.values.email,
      password: formik.values.password,
    });
    const delayTime = 2000;
    if (loginMutation?.data) {
      toast.success(loginMutation?.data?.message, {
        position: "top-right",
        autoClose: delayTime,
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/"); // Navigate to home path "/"
      }, delayTime);
    } else if (loginMutation?.error) {
      toast.error(loginMutation?.error?.data?.message, {
        position: "top-right",
        type: "error",
        autoClose: delayTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (
        loginMutation?.error?.data?.hasOwnProperty("isVerified") &&
        loginMutation.error.data.isVerified === false
      ) {
        setTimeout(() => {
          navigate("/reverify");
        }, delayTime);
      }
      return;
    }
    const { message, ...rest } = loginMutation.data;
    localStorage.setItem("user", JSON.stringify(rest));
    dispatch(LoggedInUsers(rest));
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: signIn,
    onSubmit: () => {
      loginUser();
      formik.resetForm();
    },
  });
  const { errors, touched } = formik;

  return (
    <>
      <div
        className={`w-full rounded-md shadow-md p-4 lg:px-11 py-7 border border-line-color lg:border-none box-border`}
      >
        <div className={``}>
          <form
            onSubmit={formik.handleSubmit}
            className={`flex flex-col gap-y-4`}
          >
            <div>
              <input
                type="email"
                placeholder="example@domain.com"
                onChange={formik.handleChange}
                autoComplete="off"
                onBlur={formik.handleBlur}
                name="email"
                value={formik.values.email}
                className={`w-full px-4 py-2 font-Gilroy-Medium text-black-color placeholder:text-black-color border border-line-color rounded-md focus:outline-0`}
              />
              {errors.email && touched.email && (
                <p
                  className={`font-Gilroy-Thin text-sm text-red-color capitalize`}
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                autoComplete="off"
                onBlur={formik.handleBlur}
                name="password"
                value={formik.values.password}
                className={`w-full px-4 py-2 font-Gilroy-Medium text-black-color placeholder:text-black-color border border-line-color rounded-md focus:outline-0`}
              />
              {errors.password && touched.password && (
                <p className={`font-Gilroy-Thin text-sm text-red-color`}>
                  {errors.password}
                </p>
              )}
            </div>
            <div className={`sm:flex justify-between items-center`}>
              <div>
                {isLoading ? (
                  <button
                    disabled
                    type="submit"
                    className={`px-4 py-2 bg-secondary-bg rounded-md text-white-color`}
                  >
                    <BeatLoader color="#fff" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`px-4 py-2 font-Gilroy-Medium bg-secondary-bg rounded-md ${
                      themeMode === "dark"
                        ? "text-black-color"
                        : "text-white-color"
                    } cursor-pointer`}
                  >
                    Login
                  </button>
                )}
                <Link
                  to={"/forget-password"}
                  className={`font-Gilroy-Bold text-primary-color underline cursor-pointer ml-2`}
                >
                  Forgot Password
                </Link>
              </div>
              <p
                className={`font-Gilroy-Medium text-black-color text-base mt-4 lg:mt-0`}
              >
                Have an Account?{" "}
                <Link
                  to={"/registration"}
                  className={`font-Gilroy-Bold text-primary-color underline cursor-pointer`}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
