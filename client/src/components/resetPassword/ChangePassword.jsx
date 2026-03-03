import { useFormik } from "formik";
import React from "react";
import { newPassword } from "../../validation/validation";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../features/api/authApi";
import { ScaleLoader } from "react-spinners";

const ChangePassword = ({
  user,
  success,
  setSuccess,
  loading,
  setLoading,
  setError,
  toast,
}) => {
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();

  const initialState = {
    password: "",
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: newPassword,
    onSubmit: () => {
      changePreviousPassword();
    },
  });
  let { errors, touched } = formik;
  const changePreviousPassword = async () => {
    try {
      setLoading(true);
      let result = await changePassword({
        email: user.email,
        password: formik.values.password,
      }).unwrap();
      setSuccess(result?.massage);
      toast.success(result.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err?.data?.massage);
      toast.error(err?.data?.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <div className="min-w-1/4 bg-white-color px-8 py-4 rounded-md">
        <h2 className="font-Gilroy-Bold text-2xl text-black-color capitalize text-center border-b border-line-color pb-3">
          Change Password
        </h2>
        <p className="font-Gilroy-Medium text-base text-title-color mt-2">
          Enter a strong password.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="password"
            name="password"
            autoCapitalize="off"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter your new password"
            className="w-full p-3 mt-5 rounded-md border border-solid border-line-color font-Gilroy-Regular text-sm focus:outline-none bg-input-color"
          />
          {errors.password && touched.password && (
            <p className="font-Gilroy-Light text-base text-red-color capitalize">
              {errors.password}
            </p>
          )}
          <div className="w-full h-[1px] bg-line-color mt-2"></div>
          <div className="flex justify-between items-center">
            <Link
              to={"/login"}
              className="bg-line-color p-3 md:px-5 md:py-2 mt-4 rounded-md font-Gilroy-Regular text-sm md:text-base text-title-color cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-primary-color p-3 md:px-5 md:py-2 mt-4 rounded-md font-Gilroy-Regular text-sm md:text-base text-white-color cursor-pointer"
            >
              {loading ? <ScaleLoader height={20} /> : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
