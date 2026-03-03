import React, { useEffect, useState } from "react";
import { useReVerificationMutation } from "../../features/api/authApi";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import { Formik, useFormik } from "formik";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const ReAuth = () => {
  const [reVerification] = useReVerificationMutation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const delayTime = 3000;

  const handleVerificationLinkSend = async () => {
    try {
      setLoading(true);
      const result = await reVerification({ email: email });

      if (result?.data?.message) {
        toast.success(result?.data?.message, {
          position: "top-right",
          autoClose: delayTime,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEmail("");
        setTimeout(() => {
          navigate("/login");
        }, delayTime);
      } else if (result?.error?.data?.message) {
        toast.error(result?.error?.data?.message, {
          position: "top-right",
          autoClose: delayTime,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Helmet>
        <title>Re-Verification</title>
      </Helmet>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-1/3 mx-auto p-4 shadow-md rounded-md bg-white-color mt-5 font-Gilroy-ExtraBold text-center">
          <h4 className="text-2xl capitalize">Please verify your email</h4>
          <div>
            <input
              type="email"
              placeholder="example@domain.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className=" w-full border border-secondary-color rounded-full p-3 font-Gilroy-Medium text-xl text-center mt-3"
            />
          </div>
          <button
            onClick={handleVerificationLinkSend}
            className="font-Gilroy-Bold border border-secondary-color px-4 py-3 mt-3 rounded-xl cursor-pointer hover:bg-secondary-color transition-all ease-linear duration-200 hover:text-white-color"
          >
            {loading ? <PulseLoader size={10} color="#2697ff" /> : "Verify"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReAuth;
