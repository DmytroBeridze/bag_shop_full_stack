import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import adminReducer from "../components/pages/admin/adminSlice";
import postsReducer from "../components/adminPanel/addPostsForm/postSlice";

export default configureStore({
  reducer: { authReducer, adminReducer, postsReducer },
  devTools: process.env.NODE_ENV !== "production",
});
