import { useFormik } from "formik";
import { emailValidationCode } from "../../validation/validation";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useSendCodeVerificationMutation } from "../../features/api/authApi";
import { useEffect } from "react";
import { ScaleLoader } from "react-spinners";

const SecretCode = ({
  user,
  success,
  setSuccess,
  loading,
  setLoading,
  error,
  setError,
  setVisible,
  toast,
}) => {
  const [sendCodeVerification] = useSendCodeVerificationMutation();
  useEffect(() => {
    (success = ""), (error = "");
  }, [success, error]);
  const initialState = {
    code: "",
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: emailValidationCode,
    onSubmit: () => {
      sendCodeVerify();
    },
  });
  let { errors, touched } = formik;
  const sendCodeVerify = async () => {
    try {
      setLoading(true);
      let email = user.email;
      let result = await sendCodeVerification({
        email,
        code: formik.values.code,
      }).unwrap();
      setSuccess(result.message);
      setError("");
      setTimeout(() => {
        setVisible(3);
        setSuccess("");
      }, loading);
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      setError(err?.data?.message);
      toast.error(err?.data?.message, {
        position: "top-right",
        autoClose: 3000,
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
        <title>Secret or Verification Code</title>
      </Helmet>
      <div className="min-w-1/4 bg-white-color px-8 py-4 rounded-md">
        <h2 className="font-Gilroy-Bold text-2xl text-black-color capitalize text-center border-b border-line-color pb-3">
          Verification Code
        </h2>
        <p className="font-Gilroy-Medium text-base text-title-color mt-2">
          Please enter code that been sent your email.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="code"
            autoComplete="off"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.code}
            placeholder="Enter Your Verification Code"
            className="w-full p-3 mt-5 rounded-md border border-solid border-line-color font-Gilroy-Regular text-sm focus:outline-none bg-input-color"
          />
          {errors.code && touched.code && (
            <p className="font-Gilroy-Light text-base text-red-color capitalize">
              {errors.code}
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
              {loading ? <ScaleLoader height={20} /> : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SecretCode;
