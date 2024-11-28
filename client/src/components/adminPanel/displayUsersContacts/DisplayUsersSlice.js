import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useHttp from "../../../hooks/http.hooks";

const initialState = {
  userContacts: [],
  isloading: false,
  contactsStatus: false,
  //   contactsStatus: "loading",
};

// -----get contacts
const getUsersContacts = createAsyncThunk(
  "dislpayUsers/getUsersContacts",
  async () => {
    const { adminRequest } = useHttp();

    const { data } = await adminRequest(
      "http://localhost:3002/api/contacts/userContact"
    );
    return data;
  }
);

// -----delete contact
const deleteContact = createAsyncThunk(
  "dislpayUsers/deleteContact",
  async (id) => {
    const { adminRequest } = useHttp();
    const { data } = await adminRequest(
      `http://localhost:3002/api/contacts/userContact/${id}`,
      "delete",
      { id }
    );
    return data;
  }
);

const displayUsersSlice = createSlice({
  name: "dislpayUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // -----get contacts
    builder
      .addCase(getUsersContacts.pending, (state) => {
        state.isloading = true;
        // state.contactsStatus = null;

        state.contactsStatus = false;
        // state.contactsStatus = "loading";
      })
      .addCase(getUsersContacts.fulfilled, (state, action) => {
        state.userContacts = action.payload;
        state.isloading = false;
        // state.contactsStatus = "success";
        // state.contactsStatus = action.payload.message;
      })
      .addCase(getUsersContacts.rejected, (state, action) => {
        state.isloading = false;
        state.contactsStatus = false;
        // state.contactsStatus = "error";
      });

    // -----delete contact
    builder
      .addCase(deleteContact.pending, (state, action) => {
        state.isloading = true;
        state.contactsStatus = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isloading = false;
        state.contactsStatus = action.payload.message;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isloading = false;
        state.contactsStatus = action.error;
      });
  },
});

const { reducer, actions } = displayUsersSlice;
export { getUsersContacts, deleteContact };
export default reducer;
