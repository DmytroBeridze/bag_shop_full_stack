import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsQuantity: JSON.parse(localStorage.getItem("totalQuantity")) || 0,
};

const shoppingCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalQuantity(state, action) {
      state.productsQuantity = action.payload;
      localStorage.setItem("totalQuantity", JSON.stringify(action.payload));
    },
  },
});

const { reducer, actions } = shoppingCartSlice;
export const { setTotalQuantity } = actions;
export default reducer;
