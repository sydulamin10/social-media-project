import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import PostHome from "../../components/homeComponents/middlePart/PostHome";
import Verify from "./Verify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useVerifiedUserMutation } from "../../features/api/authApi";
import LoggedInUser from "./../../privateRouter/LoggedInUser";

const VerifyPage = () => {
  const [verifiedUser] = useVerifiedUserMutation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { userInfo } = useSelector((stat) => stat.userInformation);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    activeUser();
  }, []);

  const activeUser = async () => {
    try {
      setLoading(true);
      const result = await verifiedUser({
        emailVerificationToken: token,
        // loginRefreshToken: userInfo.loginRefreshToken,
      }).unwrap();
      setSuccess(result.message);
      setError("");
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify({ ...userInfo, isVerified: true })
      // );
      // dispatch(LoggedInUser({ ...userInfo, isVerified: true }));
      setTimeout(() => {
        setSuccess("");
        navigate("/login");
      }, 3000);
    } catch (err) {
      err && setError(err?.data?.error);
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };
  return (
    <>
      <Helmet>
        <title>Verify</title>
      </Helmet>
      {success && (
        <Verify
          type="success"
          head="Account Successfully activate."
          loading={loading}
          text={success}
        />
      )}
      {error && (
        <Verify
          type="error"
          head="Account Activation Failed."
          loading={loading}
          text={error}
        />
      )}
      {/* <PostHome /> */}
      {/* <CreatePostPopup /> */}
    </>
  );
};

export default VerifyPage;
