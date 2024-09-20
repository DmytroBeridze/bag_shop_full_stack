import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useHttp from "../../hooks/http.hooks";

const initialState = {
  goods: [],
  isloading: false,
  status: null,
};

export const fetchAllGoods = createAsyncThunk(
  "gallery/fetchAllGoods",
  async () => {
    const { adminRequest } = useHttp();
    const { data } = await adminRequest("http://localhost:3002/api/goods");
    return data;
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGoods.pending, (state, action) => {
        state.isloading = true;
        state.status = null;
      })
      .addCase(fetchAllGoods.fulfilled, (state, action) => {
        state.goods = action.payload;
        state.isloading = false;
        state.status = null;
      })
      .addCase(fetchAllGoods.rejected, (state, action) => {
        state.isloading = false;
        state.status = action.payload;
      });
  },
});

const { action, reducer } = gallerySlice;
export default reducer;
