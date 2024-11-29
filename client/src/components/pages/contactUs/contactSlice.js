import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useHttp from "../../../hooks/http.hooks";

const initialState = {
  contacts: 0,
  isloading: false,
  contactStatus: null,
};

// --post
export const sendContacts = createAsyncThunk(
  "contacts/sendContacts",
  async (body) => {
    const { adminRequest } = useHttp();
    const response = await adminRequest(
      "http://localhost:3002/api/contacts/userContact",
      "post",
      body,
      {
        "Content-type": "multipart/form-data",
      }
    );
    return response.data;
  }
);

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendContacts.pending, (state) => {
        state.isloading = true;
        state.contactStatus = null;
      })
      .addCase(sendContacts.fulfilled, (state, action) => {
        state.isloading = false;
        state.contactStatus = action.payload.message;
      })
      .addCase(sendContacts.rejected, (state, action) => {
        state.isloading = false;
        state.contactStatus = action.payload?.message || action.error.message;
      });
  },
});
const { reducer } = contactSlice;
export default reducer;
