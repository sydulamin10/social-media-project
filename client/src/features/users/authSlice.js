import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user")) || null,
};

export const userSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    LoggedInUsers: (state, action) => {
      state.userInfo = action.payload;
    },
    LoggedOutUsers: (state, action) => {
      state.userInfo = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { LoggedInUsers, LoggedOutUsers } = userSlice.actions;

export default userSlice.reducer;
