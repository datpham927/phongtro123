import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLogged = true;
    },
    setLogout: (state) => {
      state.token = null;
      state.isLogged = false;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
