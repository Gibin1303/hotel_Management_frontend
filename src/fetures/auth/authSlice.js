import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: null,      // memory only
  checked: false,   // true after the startup refresh attempt
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    tokenRefreshed: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
    },
    authChecked: (state) => {
      state.checked = true;
    },
  },
});

export const { loginSuccess, tokenRefreshed, logout, authChecked } = authSlice.actions;
export default authSlice.reducer;