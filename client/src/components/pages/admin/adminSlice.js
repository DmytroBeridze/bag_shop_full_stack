import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useHttp from "../../../hooks/http.hooks";

const initialState = {
  goods: [],
  isLoading: false,
  status: null,
};

// add goods
export const addGoods = createAsyncThunk("admin/addGoods", async (body) => {
  const { adminRequest } = useHttp();
  const { data } = await adminRequest(
    "http://localhost:3002/api/goods",
    "post",
    body,
    { "Content-type": "multipart/form-data" }
  );

  return data;
});

// get goods
export const getGoods = createAsyncThunk("admin/getGoods", async () => {
  const { adminRequest } = useHttp();
  // TODO----Якщо не деструктурувати респонс, а повертати adminRequest, то помилка "A non-serializeble value was detected in action "
  const { data } = await adminRequest("http://localhost:3002/api/goods");
  return data;
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearStatus: (state) => {
      return {
        ...state,
        status: null,
      };
    },
  },
  extraReducers: (builder) => {
    // add goods
    builder
      .addCase(addGoods.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          status: null,
        };
      })
      .addCase(addGoods.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          status: action.payload.message,
        };
      })

      .addCase(addGoods.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          status: action.error.message,
        };
      });

    // get goods
    builder
      .addCase(getGoods.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          status: null,
        };
      })
      .addCase(getGoods.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          goods: action.payload,
          status: null,
        };
      })
      .addCase(getGoods.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          status: action.payload,
        };
      });
  },
});

const { actions, reducer } = adminSlice;
export const { clearStatus } = actions;
export default reducer;
