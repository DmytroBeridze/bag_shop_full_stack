import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useHttp from "../../hooks/http.hooks";

const initialState = {
  name: null,
  token: null,
  isLoading: false,
  status: null,
};

// login
export const loginFetch = createAsyncThunk("auth/loginFetch", async (value) => {
  const { adminRequest } = useHttp();
  const { data } = await adminRequest(
    "http://localhost:3002/api/auth/admin/login",
    "post",
    value
  );

  return data;
});

// getMe
export const getMe = createAsyncThunk("auth/getMe", async () => {
  const { adminRequest } = useHttp();

  const { data } = await adminRequest(
    "http://localhost:3002/api/auth/admin/me",
    "get"
  );
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      return {
        ...state,
        name: null,
        token: null,
        isLoading: false,
        status: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginFetch.pending, (state) => {
        return {
          ...state,
          isLoading: "true",
          status: null,
        };
      })
      .addCase(loginFetch.fulfilled, (state, action) => {
        window.localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          isLoading: "false",
          status: action.payload.message,
          token: action.payload?.token,
          name: action.payload.user?.name,
        };
      })

      .addCase(loginFetch.rejected, (state, action) => {
        return {
          ...state,
          isLoading: "false",
          status: action.payload.message,
        };
      });

    // getMe
    builder
      .addCase(getMe.pending, (state) => {
        return {
          ...state,
          isLoading: "true",
          status: null,
        };
      })
      .addCase(getMe.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: "false",
          status: null,
          token: action.payload?.token,
          name: action.payload.user?.name,
        };
      })
      .addCase(getMe.rejected, (state, action) => {
        return {
          ...state,
          isLoading: "false",
          status: action.payload.message,
        };
      });
  },
});

const { actions, reducer } = authSlice;

//token verification on reboot
export const checkIsAuth = (state) => Boolean(state.authReducer.token);

export const { logout } = actions;
export default reducer;
