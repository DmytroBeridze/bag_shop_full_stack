import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsQuantity: JSON.parse(localStorage.getItem("totalQuantity")) || 0,
  products: [],
  message: "",
};

const shoppingCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalQuantity(state, action) {
      state.productsQuantity = action.payload;
      localStorage.setItem("totalQuantity", JSON.stringify(action.payload));
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    // totalParam(state, action) {
    //   state.param = action.payload;
    // },
  },
});

const { reducer, actions } = shoppingCartSlice;
export const { setTotalQuantity, setProducts, setMessage, totalParam } =
  actions;
export default reducer;
