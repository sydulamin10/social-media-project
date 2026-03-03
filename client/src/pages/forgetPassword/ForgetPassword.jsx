import React, { useState } from "react";
import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import { useFormik } from "formik";
// import { emailValidation } from "../../validation/validation";
import FindAccount from "../../components/resetPassword/FindAccount";
import ResetPassword from "../../components/resetPassword/ResetPassword";
import SecretCode from "../../components/resetPassword/SecretCode";
import ChangePassword from "../../components/resetPassword/ChangePassword";
import { ToastContainer, toast } from "react-toastify";

const ForgetPassword = () => {
  const [visible, setVisible] = useState(0);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const renderComponent = () => {
    switch (visible) {
      case 0:
        return (
          <FindAccount
            setUser={setUser}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            setVisible={setVisible}
          />
        );
        break;
      case 1:
        if (user) {
          return (
            <ResetPassword
              user={user}
              success={success}
              setSuccess={setSuccess}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              setVisible={setVisible}
            />
          );
        }
        setVisible(0);
        return null;
        break;
      case 2:
        if (user) {
          return (
            <SecretCode
              user={user}
              success={success}
              setSuccess={setSuccess}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              setVisible={setVisible}
              toast={toast}
            />
          );
        }
        setVisible(0);
        return null;
        break;
      case 3:
        if (user) {
          return (
            <ChangePassword
              user={user}
              success={success}
              setSuccess={setSuccess}
              loading={loading}
              setLoading={setLoading}
              setError={setError}
              toast={toast}
            />
          );
        }
        setVisible(0);
        return null;
        break;

      default:
        return null;
        break;
    }
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div
        className={`w-full h-screen bg-gradient-to-br from-purple-color-100 to-pink-color-100 via-cyan-color-100 flex justify-center items-center`}
      >
        {renderComponent()}
      </div>
    </>
  );
};

export default ForgetPassword;
