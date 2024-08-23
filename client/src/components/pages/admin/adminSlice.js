import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useHttp from "../../../hooks/http.hooks";

const initialState = {
  name: null,
  isLoading: false,
  status: null,
};

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
  },
});

const { actions, reducer } = adminSlice;
export const { clearStatus } = actions;
export default reducer;
