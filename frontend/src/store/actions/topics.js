import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

const config = {
  credentials: "include",
  withCredentials: true,
};

const URL = "http://localhost:3001";

export const getAllTopics = createAsyncThunk("topic/getTopics", async () => {
  try {
    const response = await fetch(`${URL}/getAllTopics`, {
      ...config,
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      return data.message;
    }
    return data;
  } catch (e) {
    const data = e?.response?.data;
    return data;
  }
});

export const getTopic = createAsyncThunk("topic/getTopic", async (id) => {
  try {
    const response = await fetch(`${URL}/getTopic/${id}`, {
      ...config,
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      enqueueSnackbar(data.message, { variant: "error" });
      return data;
    } else if (response.ok) {
      return data;
    }
  } catch (e) {
    const data = e?.response?.data;
    return data;
  }
});

export const deleteTopic = createAsyncThunk("topic/deleteTopic", async (id) => {
  try {
    const response = await fetch(`${URL}/deleteTopic/${id}`, {
      ...config,
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      enqueueSnackbar(data.message, { variant: "error" });
      return data;
    } else if (response.ok) {
      enqueueSnackbar(data.message, { variant: "success" });
      return data;
    }
  } catch (e) {
    const data = e?.response?.data;
    return data;
  }
});

export const createTopic = createAsyncThunk(
  "topic/createTopic",
  async (topic) => {
    try {
      const response = await fetch(`${URL}/createTopic`, {
        headers: {
          "Content-Type": "application/json",
        },
        ...config,
        method: "POST",
        body: JSON.stringify({
          ...topic,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        return data;
      }
      enqueueSnackbar(data.message, { variant: "success" });
      return data;
    } catch (e) {
      const data = e?.response?.data;
      return data;
    }
  },
);

export const addComment = createAsyncThunk(
  "topic/addComment",
  async (payload) => {
    try {
      const response = await fetch(`${URL}/addComment`, {
        headers: {
          "Content-Type": "application/json",
        },
        ...config,
        method: "POST",
        body: JSON.stringify({
          topicId: payload.topicId,
          commentText: payload.comment,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        enqueueSnackbar(data.message, { variant: "error" });
        return data;
      }
      return data;
    } catch (e) {
      const data = e?.response?.data;
      return data;
    }
  },
);

export const getCategory = createAsyncThunk("topic/getCategory", async () => {
  try {
    const response = await fetch(`${URL}/categories`, {
      ...config,
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      return data.message;
    }
    return data;
  } catch (e) {
    const data = e?.response?.data;
    return data;
  }
});
