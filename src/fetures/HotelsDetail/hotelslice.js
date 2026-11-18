import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

export const holtelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images = action.payload;
    },
    clearImage: (state) => {
      state.images = [{}];
    },
  },
});

export const { addImage, clearImage } = holtelSlice.actions;
export default holtelSlice.reducer;
