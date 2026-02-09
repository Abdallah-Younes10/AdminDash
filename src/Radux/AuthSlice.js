import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
