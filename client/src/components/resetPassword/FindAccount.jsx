import React from "react";
import { Link } from "react-router-dom";
import { emailValidation } from "../../validation/validation";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useMatchUserMutation } from "../../features/api/authApi";
import { ScaleLoader } from "react-spinners";

const FindAccount = ({
  setUser,
  loading,
  setLoading,
  error,
  setError,
  setVisible,
}) => {
  const [matchUser] = useMatchUserMutation();
  const initialState = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: emailValidation,
    onSubmit: () => {
      findUserResult();
    },
  });
  let { errors, touched } = formik;

  const findUserResult = async () => {
    try {
      setLoading(true);
      let result = await matchUser(formik.values.email).unwrap();
      setUser(result);
      setError("");
      setTimeout(() => {
        setVisible(1);
      }, loading);
    } catch (err) {
      setError(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Find Account</title>
      </Helmet>
      <div className="min-w-1/4 bg-white-color px-8 py-4 rounded-md">
        <h2 className="font-Gilroy-Bold text-2xl text-black-color capitalize text-center border-b border-line-color pb-3">
          Find your Account
        </h2>
        <p className="font-Gilroy-Medium text-base text-title-color mt-2">
          Please enter your email Address or mobile number to find your account
        </p>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            autoComplete="off"
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.handleChange(e);
              setError("");
            }}
            value={formik.values.email}
            placeholder="Email Address"
            className="w-full p-3 mt-5 rounded-md border border-solid border-line-color font-Gilroy-Regular text-sm focus:outline-none bg-input-color"
          />
          {errors.email && touched.email && (
            <p className="font-Gilroy-Light text-base text-red-color capitalize">
              {errors.email}
            </p>
          )}
          {error && (
            <p className="font-Gilroy-Light text-base text-red-color capitalize">
              {error}ss
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
              {loading ? <ScaleLoader height={20} /> : "Search"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FindAccount;
