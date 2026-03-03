import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./users/authSlice";
import { authApi } from "./api/authApi";
import themeReducer from "./themes/themeSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    userInformation: authSlice,
    themeMode: themeReducer,
  },
  // devTools: ProcessingInstruction.env.NODE_ENV !== "production", // It's for Normal React Application.
  devTools: import.meta.env.MODE !== "production", // It's for React + Vite Application.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export default store;
