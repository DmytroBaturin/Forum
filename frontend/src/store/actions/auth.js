import {createAsyncThunk} from '@reduxjs/toolkit';
import {enqueueSnackbar} from "notistack";

const config = {
    credentials: 'include',
    withCredentials: true,
};
const URL = 'http://localhost:3001';

export const logOut = createAsyncThunk('auth/logOut', async () => {
    try {
        const response = await fetch(`${URL}/logout`, {
            ...config,
            method: 'POST',
        });
        const data = await response.json();
        if(!response.ok){
            await enqueueSnackbar(data.message, {variant: 'error'});
            return data;
        }else if(response.ok){
            await enqueueSnackbar(data.message, {variant: 'success'});
            return data;
        }
    } catch (error) {
        return error?.response?.data;
    }
});

export const login = createAsyncThunk('auth/login', async (payload, { dispatch }) => {
    try {
        const response = await fetch(`${URL}/login`, {
            ...config,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: payload.username,
                password: payload.password,
            }),
        });
        const data = await response.json();
        if(!response.ok){
            await enqueueSnackbar(data.message, {variant: 'error'});
            return data;
        }else if(response.ok){
            await enqueueSnackbar(data.message, {variant: 'success'});
            return data;
        }
    } catch (error) {
        return error?.response?.data;
    }
});


export const register = createAsyncThunk('auth/register', async (payload) => {
    try {
        const response = await fetch(`${URL}/register`, {
            ...config,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: payload.username,
                password: payload.password,
            }),
        });
        const data = await response.json();
        if(!response.ok){
            await enqueueSnackbar(data.message, {variant: 'error'});
            return data;
        }
        await enqueueSnackbar(data.message, {variant: 'success'});
        return data;
    } catch (error) {
        return error?.response?.data;
    }
});

export const checkSession = createAsyncThunk('auth/checkSession', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${URL}/check-session`, {
            ...config,
            method: 'GET'
        });
        const data = await response.json();
        if(!response.ok){
            return data;
        }
        console.log('check session')
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
