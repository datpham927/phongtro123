import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: [],
  area: [],
  dataEditPost: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;  
    },
    setArea: (state, action) => {
      state.area = action.payload;
    },
    setDataEditPost: (state, action) => {
      state.dataEditPost = action.payload;
    },
  },
}); 

export const { setPrice, setArea, setDataEditPost } = appSlice.actions;

export default appSlice.reducer;
