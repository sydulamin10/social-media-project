import React from "react";

const Gender = ({ formik, errors, touched }) => {
  return (
    <>
      <div>
        <input
          type="radio"
          id="male"
          onChange={formik.handleChange}
          autoComplete="off"
          onBlur={formik.handleBlur}
          name="gender"
          value={"male"}
          aria-label="male"
          className={`mr-1`}
        />
        <label
          htmlFor="male"
          className={`mr-5 font-Gilroy-Medium text-black-color`}
        >
          Male
        </label>
        <input
          type="radio"
          id="female"
          onChange={formik.handleChange}
          autoComplete="off"
          onBlur={formik.handleBlur}
          name="gender"
          value={"female"}
          aria-label="male"
          className={`mr-1`}
        />
        <label htmlFor="female" className="font-Gilroy-Medium text-black-color">
          Female
        </label>
        {errors.gender && touched.gender && (
          <p className={`font-Gilroy-Thin text-sm text-red-color`}>
            {errors.password}
          </p>
        )}
      </div>
    </>
  );
};

export default Gender;
