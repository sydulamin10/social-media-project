import LeftAuth from "../../components/authentication/LeftAuth";
import RegistrationIcon from "../../assets/svg/RegistrationIcon";
import RegistrationForm from "../../components/authentication/RegistrationForm";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import { setThemeMode } from "../../features/themes/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Moon } from "../../assets/svg/Moon";

const Registration = () => {
  const themeMode = useSelector((state) => state.themeMode.mode);
  const dispatch = useDispatch();
  const handleMode = () => {
    if (themeMode === "light") {
      dispatch(setThemeMode("dark"));
      localStorage.setItem("mode", JSON.stringify("dark"));
    } else if (themeMode === "dark") {
      dispatch(setThemeMode("light"));
      localStorage.setItem("mode", JSON.stringify("light"));
    }
  };
  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Registration in Ramen's Social Media</title>
      </Helmet>
      <div className="relative flex justify-center items-center">
        <div
          onClick={() => handleMode()}
          className="w-10 h-10 rounded-full bg-white-color-100 flex items-center justify-center mb-3 cursor-pointer hover:bg-black-color hover:text-white-color transition-all ease-linear duration-75 absolute top-10 right-10 z-50"
        >
          <Moon />
        </div>
        <div className={`relative z-10`}>
          <div
            className={`hidden lg:block w-[500px] h-[500px] bg-purple-100 rounded-full absolute -left-40 -top-40 -z-10`}
          ></div>
          <div
            className={`h-screen container flex justify-center items-center gap-x-6`}
          >
            <div className={`xl:w-[35%] lg:w-[40%] hidden lg:block`}>
              <LeftAuth
                icon={<RegistrationIcon />}
                title="Start your journey"
                description={`Sign Up to create your account, unlock exclusive features, and enjoy seamless access across all your devices anytime, anywhere.`}
                // description={`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores vitae obcaecati quae ipsa exercitationem fugiat voluptates veniam voluptate laborum nulla iste quaerat culpa, eveniet expedita officiis sapiente id quasi quia, aliquid corporis totam? Consequuntur in temporibus, inventore ipsa, nesciunt iste soluta neque beatae cumque quasi culpa quos. Aut nam accusantium molestiae quia enim cupiditate officiis aperiam earum voluptas vitae quaerat voluptatem minus, id temporibus qui voluptatum officia perspiciatis suscipit amet? Eius, vitae  voluptates nulla, qui nam enim rerum quis in totam, est dolore incidunt quo sunt itaque velit laboriosam! Accusamus odio nemo repellendus minima quia fugiat beatae unde maxime laboriosam.`}
              />
            </div>
            <div className={`w-full lg:w-[45%] xl:w-[35%]`}>
              <RegistrationForm toast={toast} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
