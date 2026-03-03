import { useState } from "react";
import { Link } from "react-router";
import { Formik, useFormik } from "formik";
import { signUp } from "../../validation/validation";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import DateOfBirth from "./DateOfBirth";
import Gender from "./Gender";
import { useAddUserMutation } from "../../features/api/authApi";
const initialState = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: "",
};

const RegistrationForm = ({ toast }) => {
  const [ageError, setAgeError] = useState();
  const [addUser, { isLoading }] = useAddUserMutation();
  const navigate = useNavigate();

  const userRegistration = async () => {
    const signUpMutation = await addUser({
      fName: formik.values.fName,
      lName: formik.values.lName,
      email: formik.values.email,
      password: formik.values.password,
      bYear: formik.values.bYear,
      bMonth: formik.values.bMonth,
      bDay: formik.values.bDay,
      gender: formik.values.gender,
    });
    if (signUpMutation?.data) {
      toast.success(signUpMutation?.data?.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/login"); // Navigate to home path "/"
      }, 2000);
    } else if (signUpMutation?.error) {
      toast.error(signUpMutation?.error?.data?.message, {
        position: "top-right",
        type: "error",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        theme: "light",
      });
      return;
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: signUp,
    onSubmit: () => {
      const currentDate = new Date();
      const pickedDate = new Date(
        formik.values.bYear,
        formik.values.bMonth - 1,
        formik.values.bDay
      );
      const adult = new Date(1970 + 18, 0, 1);
      const tooOld = new Date(1970 + 70, 0, 1);

      if (currentDate - pickedDate < adult) {
        return setAgeError(`Underage your are not 18.`);
      } else if (currentDate - pickedDate > tooOld) {
        return setAgeError("Overage your are 70+.");
      } else {
        userRegistration();
        formik.resetForm();
        setAgeError("");
      }
    },
  });
  const { errors, touched } = formik;

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(105), (val, index) => currentYear - index);

  const monthStart = 1;
  const months = Array.from(new Array(12), (val, index) => monthStart + index);
  const daysInTheMonth = () => {
    // console.log(
    //   new Date(formik.values.bYear, formik.values.bMonth, 0).getDate()
    // );
    return new Date(formik.values.bYear, formik.values.bMonth, 0).getDate(); //how many days in a month
  };

  const days = Array.from(
    new Array(daysInTheMonth()),
    (value, index) => 1 + index
  );

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
                type="text"
                placeholder="First Name"
                onChange={formik.handleChange}
                autoComplete="off"
                onBlur={formik.handleBlur}
                name="fName"
                value={formik.values.fName}
                className={`w-full px-4 py-2 font-Gilroy-Medium bg-white-color-100 placeholder:text-black-color text-black-color border border-line-color rounded-md focus:outline-0`}
              />
              {errors.fName && touched.fName && (
                <p
                  className={`font-Gilroy-Thin text-sm text-red-color capitalize`}
                >
                  {errors.fName}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                onChange={formik.handleChange}
                autoComplete="off"
                onBlur={formik.handleBlur}
                name="lName"
                value={formik.values.lName}
                className={`w-full px-4 py-2 font-Gilroy-Medium bg-white-color-100 placeholder:text-black-color text-black-color border border-line-color rounded-md focus:outline-0`}
              />
              {errors.lName && touched.lName && (
                <p
                  className={`font-Gilroy-Thin text-sm text-red-color capitalize`}
                >
                  {errors.lName}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="example@domain.com"
                onChange={formik.handleChange}
                autoComplete="off"
                onBlur={formik.handleBlur}
                name="email"
                value={formik.values.email}
                className={`w-full px-4 py-2 font-Gilroy-Medium bg-white-color-100 placeholder:text-black-color text-black-color border border-line-color rounded-md focus:outline-0`}
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
                className={`w-full px-4 py-2 font-Gilroy-Medium bg-white-color-100 placeholder:text-black-color text-black-color border border-line-color rounded-md focus:outline-0`}
              />
              {errors.password && touched.password && (
                <p className={`font-Gilroy-Thin text-sm text-red-color`}>
                  {errors.password}
                </p>
              )}
            </div>
            <DateOfBirth
              formik={formik}
              years={years}
              months={months}
              days={days}
              ageError={ageError}
            />
            <Gender formik={formik} errors={errors} touched={touched} />
            <div
              className={`sm:flex justify-between items-center text-black-color`}
            >
              {isLoading ? (
                <button
                  disabled
                  type="submit"
                  className={`px-4 py-2 font-Gilroy-Medium bg-secondary-bg rounded-md text-white-color`}
                >
                  <BeatLoader color="#fff" />
                </button>
              ) : (
                <button type="submit" className={`btn btnPrimary`}>
                  Submit
                </button>
              )}
              <p className={`font-Gilroy-Medium text-base mt-4 lg:mt-0`}>
                Already have an Account?{" "}
                <Link
                  to={"/login"}
                  className={`font-bold text-primary-color underline cursor-pointer`}
                >
                  Sing In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
