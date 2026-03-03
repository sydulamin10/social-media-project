import React from "react";

const DateOfBirth = ({ formik, years, months, days, ageError = null }) => {
  return (
    <>
      <div>
        <label className={`font-Gilroy-Bold text-md text-black-color`}>
          Select Date of Birth
        </label>
        <div className={`flex justify-between gap-x-2 lg:gap-x-7`}>
          <select
            onChange={formik.handleChange}
            autoComplete="off"
            onBlur={formik.handleBlur}
            name="bYear"
            value={formik.values.bYear}
            className={`w-1/3 font-Gilroy-Regular text-black-color border border-line-color p-2 capitalize`}
          >
            <option>year</option>
            {years.map((year, index) => (
              <option key={index}>{year}</option>
            ))}
          </select>
          <select
            onChange={formik.handleChange}
            autoComplete="off"
            onBlur={formik.handleBlur}
            name="bMonth"
            value={formik.values.bMonth}
            className={`w-1/3 font-Gilroy-Regular text-black-color border border-line-color p-2 capitalize`}
          >
            <option value="Month">Month</option>
            {months.map((month, index) => (
              <option key={index}>{month}</option>
            ))}
          </select>
          <select
            onChange={formik.handleChange}
            autoComplete="off"
            onBlur={formik.handleBlur}
            name="bDay"
            value={formik.values.bDay}
            className={`w-1/3 font-Gilroy-Regular text-black-color border border-line-color p-2 capitalize`}
          >
            <option value="Day">Day</option>
            {days.map((day, index) => (
              <option key={index}>{day}</option>
            ))}
          </select>
        </div>
        {ageError && (
          <p className={`font-Gilroy-Regular text-red-color`}>{ageError}</p>
        )}
      </div>
    </>
  );
};

export default DateOfBirth;
