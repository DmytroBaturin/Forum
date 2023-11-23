import { createSlice } from "@reduxjs/toolkit";
import { checkSession, login, logOut, register } from "./actions/auth";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: "",
    isAuth: false,
    userInfo: "",
    loadedLayout: true,
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.authLoading = true;
      state.error = "";
    },
    [login.fulfilled]: (state, action) => {
      state.userInfo = action.payload.user;
      state.isAuth = action.payload.isAuth;
      state.error = "";
    },
    [login.rejected]: (state, action) => {
      state.error = action.error.message;
      state.isAuth = false;
      state.userInfo = "";
    },
    [logOut.fulfilled]: (state) => {
      state.userInfo = "";
      state.isAuth = false;
    },
    [logOut.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [register.pending]: (state) => {
      state.error = "";
    },
    [register.fulfilled]: (state, action) => {
      state.userInfo = action.payload.user;
      state.isAuth = action.payload.isAuth;
      state.error = "";
    },
    [register.rejected]: (state, action) => {
      state.error = action.error.message;
    },

    [checkSession.fulfilled]: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.userInfo = action.payload.isAuth ? action.payload.user : "";
    },
    [checkSession.rejected]: (state, action) => {
      state.isAuth = false;
      state.userInfo = "";
      state.error = action.error.message || "Session check failed";
    },
  },
});

export const userInfo = (state) => state.auth.userInfo;
export const selectAuthStatus = (state) => state.auth.isAuth;
export default authSlice.reducer;
