import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsQuantity: JSON.parse(localStorage.getItem("totalQuantity")) || 0,
  products: JSON.parse(localStorage.getItem("goods")) || [],
  message: JSON.parse(localStorage.getItem("message")) || "",
};

const shoppingCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ----set products
    setProducts(state, action) {
      state.products = action.payload;
    },

    // ----set total quantity
    setTotalQuantity(state, action) {
      state.productsQuantity = action.payload;
      localStorage.setItem("totalQuantity", JSON.stringify(action.payload));
    },

    //----- set message
    setMessage(state, action) {
      state.message = action.payload;
      localStorage.setItem("message", JSON.stringify(action.payload));
    },
  },
});

const { reducer, actions } = shoppingCartSlice;
export const { setProducts, setMessage, setTotalQuantity } = actions;
export default reducer;
