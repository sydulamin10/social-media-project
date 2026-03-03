import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";
import Registration from "./pages/registration/Registration";
import ErrorPage from "./pages/error/ErrorPage";
import Login from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import NotLoggedInUser from "./privateRouter/NotLoggedInUser";
import LoggedInUser from "./privateRouter/LoggedInUser";
import RootLayout from "./components/rootLayout/RootLayout";
import VerifyPage from "./pages/home/VerifyPage";
import ReAuth from "./components/reAuth/ReAuth";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
// import CreatePostPopup from "./components/homeComponents/middlePart/createPostPopup/CreatePostPopup";
import { useEffect, useState } from "react";
import ProfilePage from "./pages/profile/ProfilePage";
import FriendsPage from "./pages/friends/FriendsPage";
import { useSelector } from "react-redux";

function App() {
  const [visible, setVisible] = useState(false);

  const themeMode = useSelector((state) => state?.themeMode.mode);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Unexpected request or error path */}
        <Route path="*" element={<ErrorPage />}></Route>

        {/* Before Login */}
        <Route element={<NotLoggedInUser />}>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/verify/:token" element={<VerifyPage />} />
          <Route path="/reverify" element={<ReAuth />}></Route>
        </Route>

        {/* After Login */}
        <Route element={<LoggedInUser />}>
          <Route element={<RootLayout />}>
            <Route
              path="/"
              element={<HomePage visible={visible} setVisible={setVisible} />}
            ></Route>
            <Route path="/friends" element={<FriendsPage />}></Route>

            {/* Own user Profile */}
            <Route
              path="/profile"
              element={
                <ProfilePage visible={visible} setVisible={setVisible} />
              }
            ></Route>

            {/* Other user Profile */}
            <Route path="/profile/:username" element={<ProfilePage />}></Route>
          </Route>
        </Route>

        {/* Common Route */}
        <Route path="forget-password" element={<ForgetPassword />} />
      </Route>
    )
  );

  useEffect(() => {
    if (themeMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [themeMode]);
  return (
    <>
      {/* {visible && <CreatePostPopup />} */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
