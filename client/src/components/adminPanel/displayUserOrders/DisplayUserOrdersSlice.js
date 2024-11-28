import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useHttp from "../../../hooks/http.hooks";

// ----get all orders
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async () => {
    const { adminRequest } = useHttp();
    const { data } = await adminRequest(
      "http://localhost:3002/api/orders/userOrder"
    );
    return data;
  }
);

// -----delete order
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id) => {
    const { adminRequest } = useHttp();
    const { data } = await adminRequest(
      `http://localhost:3002/api/orders/userOrder/${id}`,
      "delete",
      { id }
    );
    return data;
  }
);

const initialState = {
  orders: [],
  isLoading: false,
  orderStatus: false,
};

const userOrdersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ----get all orders
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.orderStatus = false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.orderStatus = false;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.orderStatus = action.error;
      });
    // -----delete order

    builder
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.orderStatus = false;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderStatus = action.payload.message;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.orderStatus = action.error.message;
      });
  },
});

const { reducer, actions } = userOrdersSlice;
export default reducer;
