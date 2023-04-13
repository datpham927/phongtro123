import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postFilterCode: [],
  listPost: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostFilterCode: (state, action) => {
      state.postFilterCode = action.payload;
    },
    setListPost: (state, action) => {
      state.listPost = action.payload;
    },
  },
});

export const { setPostFilterCode, setListPost } = postSlice.actions;

export default postSlice.reducer;
