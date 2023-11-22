import {createAsyncThunk} from "@reduxjs/toolkit";
import {enqueueSnackbar} from "notistack";


const config = {
    credentials: 'include',
    withCredentials: true,
};
const URL = 'http://localhost:3001';

export const getUsers = createAsyncThunk('admin/getUsers', async () => {
    try {
        const response = await fetch(`${URL}/getUsers`, {
            ...config,
            method: 'GET',
        });
        const data = await response.json();
        if(!response.ok){
            await enqueueSnackbar(data.message, {variant: 'error'});
            return data;
        }else if(response.ok){
            return data;
        }
    } catch (error) {
        return error?.response?.data;
    }
})

export const deleteUser = createAsyncThunk('admin/deleteUser', async (payload) => {
    try {
        const response = await fetch(`${URL}/deleteUser`, {
            ...config,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                payload
            )
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
})