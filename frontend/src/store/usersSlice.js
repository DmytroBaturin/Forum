import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, getUsers, giveRole, deleteUserRole, getRoles } from './actions/admin';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        allUsers: [],
        roles: [],
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.loading = true;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.allUsers = action.payload;
            state.loading = false;
        },
        [getUsers.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.allUsers = state.allUsers.filter(user => user._id !== action.payload.userId);
        },
        [giveRole.fulfilled]: (state, action) => {

            if (action.payload.updateUser) {
            const { updateUser } = action.payload;
            const userIndex = state.allUsers.findIndex(u => u?._id === updateUser?._id);
            if(userIndex !== -1) {
                state.allUsers[userIndex].roles = updateUser.roles;
            }}else {
                state.error = true;
            }
        },
        [deleteUserRole.fulfilled]: (state, action) => {
            if (action.payload.user) {
            const { user } = action.payload;
            const userIndex = state.allUsers.findIndex(u => u?._id === user?._id);
            if(userIndex !== -1) {
                state.allUsers[userIndex].roles = user.roles;
            }}
            else {
               state.error = true;
            }
        },
        [getRoles.fulfilled]: (state, action) => {
            state.roles = action.payload || [];
        },
        [deleteUser.rejected]: (state, action) => {
            state.error = action.error.message;
        },
        [giveRole.pending]: (state) => {
            state.loading = true;
        },
        [giveRole.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [deleteUserRole.pending]: (state) => {
            state.loading = true;
        },
        [deleteUserRole.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [getRoles.pending]: (state) => {
            state.loading = true;
        },
        [getRoles.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
    },
});

export const allRoles = (state) => state.users.roles;
export const usersInfo = (state) => state.users.allUsers;
export default usersSlice.reducer;
