import { configureStore } from "@reduxjs/toolkit";
import iconsViewReducer from "./IconsViewSlice";
import themeReducer from "./ThemeSlice";
import dateReducer from "./DateSlice";
import authReducer from "./AuthSlice";

export const store = configureStore({
  reducer: {
    iconsView: iconsViewReducer,
    themes: themeReducer,
    date: dateReducer,
    auth: authReducer,
  },
});
