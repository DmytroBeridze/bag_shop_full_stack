import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // productsQuantity: JSON.parse(localStorage.getItem("totalQuantity")) || 0,
  products: [],
  message: "",
  elementsWithTotalParams: [],
  totalParams: {
    quantity: JSON.parse(localStorage.getItem("totalQuantity")) || 0,
  },
};

const shoppingCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // setTotalQuantity(state, action) {
    //   state.productsQuantity = action.payload;
    //   localStorage.setItem("totalQuantity", JSON.stringify(action.payload));
    // },

    // ----set products
    setProducts(state, action) {
      state.products = action.payload;
    },

    //----- set message
    setMessage(state, action) {
      // console.log(action);
      state.message = action.payload;
    },

    // ---set elements with tital parameters
    setElementsWithTotalParams(state, action) {
      const { totalPrice, totalWeight, quantity, name, _id, picture } =
        action.payload;
      state.param = action.payload;
      const res = state.elementsWithTotalParams.filter(
        (elem) => elem.name !== name
      );

      state.elementsWithTotalParams = [
        ...res,
        {
          totalPrice,
          totalWeight,
          quantity,
          name,
          _id,
          picture,
        },
      ];
    },

    // ----set total parameters
    setTotalParams(state, action) {
      state.totalParams = action.payload;
    },
  },
});

const { reducer, actions } = shoppingCartSlice;
export const {
  // setTotalQuantity,
  setProducts,
  setMessage,
  setElementsWithTotalParams,
  setTotalParams,
} = actions;
export default reducer;
