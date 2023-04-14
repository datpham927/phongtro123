import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: [],
  area: [],
  dataEditPost: [],
  isUpload:false
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
    setIsUpdate: (state) => {
      state.isUpload = !state.isUpload;
    },
  },
}); 

export const { setPrice, setArea, setDataEditPost ,setIsUpdate} = appSlice.actions;

export default appSlice.reducer;
