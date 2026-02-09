import { createSlice } from "@reduxjs/toolkit";



const themeSlice = createSlice({
  name: "themes",
  initialState: { isDark: false },
  reducers: {
    setTheme: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
