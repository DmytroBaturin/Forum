import {createSlice} from "@reduxjs/toolkit";
import {deleteUser, getUsers} from "./actions/admin";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
       allUsers: [],
    },
    reducers: {
    },
    extraReducers: {
      [getUsers.fulfilled]: (state, action) => {
          state.allUsers = action.payload
      },
      [deleteUser.fulfilled]: (state, action) => {
          state.allUsers = state.allUsers.filter(user => user._id !== action.payload.user);
      }
    },
})

export const usersInfo = (state) => state.users.allUsers;
export default usersSlice.reducer