import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import useHttp from "../../hooks/http.hooks";

const initialState = {
  goods: [],
  isloading: false,
  status: null,

  oneProduct: null,
  oneProductisloading: false,
  oneProductStatus: null,

  quantity: null,
  elemId: null,
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
  reducers: {
    // show modal FromQuickView
    productCartOpen(state, action) {
      state.quantity = action.payload;
    },

    // show modal FromGalleryCard
    productCartOpenFromGalleryCard(state, action) {
      state.elemId = action.payload;
    },

    // clear oneProduct state
    clearOneProductState(state) {
      state.oneProduct = null;
    },
  },
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
        // state.status = action.message;
        state.status = action.error.name;
      });

    // get goods by id
    builder
      .addCase(fetchGoodsById.pending, (state) => {
        // console.log("Загрузка продукта началась");
        state.oneProductisloading = true;
        state.oneProductStatus = null;
      })
      .addCase(fetchGoodsById.fulfilled, (state, action) => {
        // console.log("Продукт загружен:", action.payload);
        state.oneProductisloading = false;
        state.oneProductStatus = null;
        state.oneProduct = action.payload;
      })
      .addCase(fetchGoodsById.rejected, (state, action) => {
        // console.log("Ошибка загрузки продукта:", action.payload);
        state.oneProductisloading = false;
        state.oneProductStatus = action.payload;
      });
  },
});

const { actions, reducer } = gallerySlice;

export const {
  productCartOpen,
  productCartOpenFromGalleryCard,
  clearOneProductState,
} = actions;
export default reducer;
