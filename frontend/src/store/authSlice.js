import { createSlice } from "@reduxjs/toolkit";
import { checkSession, login, logOut, register } from "./actions/auth";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: [],
    isAuth: false,
    userInfo: "",
    loadedLayout: true,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
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
      state.error = action.payload;
      state.isAuth = false;
      state.userInfo = "";
    },
    [logOut.fulfilled]: (state) => {
      state.userInfo = "";
      state.isAuth = false;
    },
    [logOut.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    [register.pending]: (state) => {
      state.error = "";
    },
    [register.fulfilled]: (state, action) => {
      if (!state.isAuth) {
        state.error = action.payload;
      } else {
        state.userInfo = action.payload.user;
        state.isAuth = action.payload.isAuth;
      }
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [checkSession.fulfilled]: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.userInfo = action.payload.isAuth ? action.payload.user : "";
    },
    [checkSession.rejected]: (state, action) => {
      state.isAuth = false;
      state.userInfo = "";
      state.error = action.payload || "Session check failed";
    },
  },
});
export const errorSelector = (state) => state.auth.error;
export const userInfo = (state) => state.auth.userInfo;
export const selectAuthStatus = (state) => state.auth.isAuth;
export const { clearError } = authSlice.actions;
export default authSlice.reducer;
