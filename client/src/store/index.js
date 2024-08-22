import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import adminReducer from "../components/pages/admin/adminSlice";

export default configureStore({
  reducer: { authReducer, adminReducer },
  devTools: process.env.NODE_ENV !== "production",
});
