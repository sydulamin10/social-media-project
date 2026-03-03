import "./assets/css/tailwind.css";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css"; //As per Video It's for Tost Message
import "react-loading-skeleton/dist/skeleton.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import store from "./features/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
