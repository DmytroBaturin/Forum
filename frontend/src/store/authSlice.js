import {createSlice} from "@reduxjs/toolkit";
import {checkSession, login, logOut, register} from "./actions/auth";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authLoading: false,
        error: '',
        isAuth: false,
        userInfo: '',
        loadedLayout: true,
    },
    reducers: {
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
           state.userInfo = action.payload.user
           state.isAuth = action.payload.isAuth;
        },
        [login.pending]: (state, action) => {
        },
        [login.rejected]: (state, action) => {
        },
        [logOut.fulfilled]: (state, action) => {
            state.userInfo = '';
            state.isAuth = action.payload.isAuth;
        },
        [register.fulfilled]: (state, action) => {
            state.userInfo = action.payload.user
            state.isAuth = action.payload.isAuth;
        },
        [register.pending]: (state, action) => {

        },
        [register.rejected]: (state, action) => {
        },
        [checkSession.fulfilled]: (state, action) => {
            state.isAuth = action.payload.isAuth;
            state.userInfo = action.payload.isAuth ? action.payload.user : '';
        },
        [checkSession.rejected]: (state, action) => {
            state.isAuth = false;
            state.userInfo = '';
        }
    },
})

export const userInfo = (state) => state.auth.userInfo;
export const selectAuthStatus = (state) => state.auth.isAuth;
export default authSlice.reducer