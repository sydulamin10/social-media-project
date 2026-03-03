import { useFormik } from "formik";
import React from "react";
import { emailValidation } from "../../validation/validation";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSendCodeMutation } from "../../features/api/authApi";
import { ScaleLoader } from "react-spinners";

const ResetPassword = ({
  user,
  success,
  setSuccess,
  loading,
  setLoading,
  error,
  setError,
  setVisible,
}) => {
  const [sendCode] = useSendCodeMutation();
  const initialState = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: emailValidation,
    onSubmit: () => {
      console.log("first");
    },
  });
  let { errors, touched } = formik;

  const handleSendCode = async () => {
    try {
      setLoading(true);
      let result = await sendCode(user.email).unwrap();
      setSuccess(result.message);
      setError("");
      setTimeout(() => {
        setVisible(2);
        setSuccess("");
      }, loading);
    } catch (error) {
      setError(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="min-w-1/4 bg-white-color px-8 py-4 rounded-md">
        <h2 className="font-Gilroy-Bold text-2xl text-black-color capitalize text-center border-b border-line-color pb-3">
          Reset Password
        </h2>
        <p className="font-Gilroy-Medium text-base text-title-color mt-2">
          how do you want to receive the code to reset your password?
        </p>
        <div className="text-center mt-5">
          <div className="w-14 h-14 bg-secondary-bg rounded-full mx-auto overflow-hidden">
            <img
              src={user?.profilePicture || null}
              alt="profilePicture"
              className="w-full h-auto object-cover"
            />
          </div>
          <span>Application User</span>
        </div>
        <div className="flex justify-center items-center gap-x-3 mt-5">
          <input type="radio" name="" id="reset" defaultChecked={true} />
          <label
            htmlFor="reset"
            className="font-Gilroy-Regular text-sm text-black-color"
          >
            {user.email}
          </label>
        </div>
        {success && (
          <p className="font-Gilroy-Bold text-base text-green-color text-center">
            {success}
          </p>
        )}
        {error && (
          <p className="font-Gilroy-Bold text-base text-red-color text-center">
            {error}
          </p>
        )}
        <div className="flex justify-center items-center gap-x-4">
          <Link
            to={"/login"}
            className="bg-line-color p-3 md:px-5 md:py-2 mt-4 rounded-md font-Gilroy-Regular text-sm md:text-base text-title-color cursor-pointer"
          >
            Not you?
          </Link>
          <button
            type="submit"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            onClick={handleSendCode}
            className="bg-primary-color p-3 md:px-5 md:py-2 mt-4 rounded-md font-Gilroy-Regular text-sm md:text-base text-white-color cursor-pointer"
          >
            {loading ? <ScaleLoader height={20} /> : "Continue"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
