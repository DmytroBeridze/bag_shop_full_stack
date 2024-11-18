import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useHttp from "../../../hooks/http.hooks";

const initialState = {
  orders: [],
  cities: [],
  countries: [],
  isLoading: false,
  status: null,
};

// create order
export const submitOrder = createAsyncThunk(
  "checkout/submitOrder",
  async (orderData) => {
    const { adminRequest } = useHttp();
    const response = await adminRequest(
      "http://localhost:3002/api/orders/userOrder",
      "post",
      orderData,
      { "Content-type": "multipart/form-data" }
    );
    // localStorage.removeItem("goods");
    // localStorage.removeItem("allGoodsPrice");
    // localStorage.removeItem("totalQuantity");
    // localStorage.removeItem("message");
    return response.data;
  }
);

// get cities
export const getCities = createAsyncThunk(
  "checkout/getCities",
  async ({ searchQuery, apikey }) => {
    const { adminRequest } = useHttp();
    const { data } = await adminRequest(
      `http://api.geonames.org/searchJSON?name_startsWith=${searchQuery}&maxRows=5&featureClass=P&username=${apikey}`,
      "get",
      null,
      {}
    );
    return data;
  }
);

// get countries
export const getCountries = createAsyncThunk(
  "checkout/getCountries",
  async ({ searchQuery, apikey }) => {
    const { adminRequest } = useHttp();
    const { data } = await adminRequest(
      `https://secure.geonames.org/searchJSON?name_startsWith=${searchQuery}&maxRows=10&username=${apikey}&featureCode=PCLI`,
      "get",
      null,
      {}
    );
    return data;
  }
);

const checkpoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create order
    builder
      .addCase(submitOrder.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.status = action.payload?.message || action.error.message;
      });

    //   get cities
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.cities = action.payload;
    });

    //   get countries
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
  },
});

const { actions, reducer } = checkpoutSlice;
export const {} = actions;
export default reducer;
