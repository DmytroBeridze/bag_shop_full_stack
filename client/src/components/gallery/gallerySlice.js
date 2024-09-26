import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useHttp from "../../hooks/http.hooks";

const initialState = {
  goods: [],
  oneProduct: null,
  isloading: false,
  status: null,
};

// all goods
export const fetchAllGoods = createAsyncThunk(
  "gallery/fetchAllGoods",
  async () => {
    const { adminRequest } = useHttp();
    const { data } = await adminRequest("http://localhost:3002/api/goods");
    return data;
  }
);

// by id
export const fetchGoodsById = createAsyncThunk(
  "gallery/fetchGoodsById",
  async (goodsId) => {
    if (goodsId) {
      const { adminRequest } = useHttp();
      const { data } = await adminRequest(
        `http://localhost:3002/api/goods/${goodsId}`
      );

      return data;
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all googs
    builder
      .addCase(fetchAllGoods.pending, (state, action) => {
        state.isloading = true;
        state.status = null;
      })
      .addCase(fetchAllGoods.fulfilled, (state, action) => {
        state.goods = action.payload;
        state.isloading = false;
        state.status = false;
      })
      .addCase(fetchAllGoods.rejected, (state, action) => {
        state.isloading = false;
        state.status = action.payload;
      });

    // get goods by id
    builder
      .addCase(fetchGoodsById.pending, (state) => {
        // state.isloading = true;
        state.status = null;
      })
      .addCase(fetchGoodsById.fulfilled, (state, action) => {
        // state.isloading = false;
        state.status = null;
        state.oneProduct = action.payload;
      })
      .addCase(fetchGoodsById.rejected, (state, action) => {
        // state.isloading = false;
        state.status = action.payload;
      });
  },
});

const { action, reducer } = gallerySlice;
export default reducer;
