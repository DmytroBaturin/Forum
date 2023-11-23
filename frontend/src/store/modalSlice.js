import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { openModal } = modalSlice.actions;
export const modalState = (state) => state.modal.open;
export default modalSlice.reducer;
