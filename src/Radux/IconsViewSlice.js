import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const iconsViewSlice = createSlice({
  name: "iconsView",
  initialState,
  reducers: {
    toggleIcons: (state) => {
      state.isOpen = !state.isOpen;
    },
    openIcons: (state) => {
      state.isOpen = true;
    },
    closeIcons: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleIcons, openIcons, closeIcons } =
  iconsViewSlice.actions;

export default iconsViewSlice.reducer;
