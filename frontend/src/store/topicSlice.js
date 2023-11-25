import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  createTopic,
  deleteTopic,
  getAllTopics,
  getCategory,
  getTopic,
} from "./actions/topics";

const topicSlice = createSlice({
  name: "topic",
  initialState: {
    topics: [],
    topic: {},
    categories: [],
    error: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [getAllTopics.fulfilled]: (state, action) => {
      state.topics = action.payload;
    },
    [getAllTopics.pending]: (state, action) => {},
    [getAllTopics.rejected]: (state, action) => {},
    [deleteTopic.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [deleteTopic.pending]: (state, action) => {},
    [deleteTopic.rejected]: (state, action) => {
      console.log(action);
    },
    [createTopic.fulfilled]: (state, action) => {
      if (!action.payload.topic) {
        state.error = action.payload;
      } else {
        state.topics.push(action.payload.topic);
      }
    },
    [createTopic.pending]: (state, action) => {},
    [createTopic.rejected]: (state, action) => {},
    [addComment.fulfilled]: (state, action) => {
      state.topic = action.payload.topic;
    },
    [addComment.pending]: (state, action) => {},
    [addComment.rejected]: (state, action) => {},
    [getTopic.fulfilled]: (state, action) => {
      state.topic = action.payload;
    },
    [getTopic.pending]: (state, action) => {},
    [getTopic.rejected]: (state, action) => {},
    [getCategory.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [getCategory.pending]: (state, action) => {},
    [getCategory.rejected]: (state, action) => {},
  },
});

export const categoriesSelector = (state) => state.topic.categories;
export const topicsSelector = (state) => state.topic.topics;
export const errorSelector = (state) => state.topic.error;
export const { clearError } = topicSlice.actions;
export default topicSlice.reducer;
