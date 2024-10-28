import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import adminReducer from "../components/pages/admin/adminSlice";

import postsReducer from "../components/adminPanel/addPostsForm/postSlice";
import galleryReducer from "../components/gallery/gallerySlice";
import mainFilterReducer from "../components/filters/mainFilters.slice";
import contacts from "../components/pages/contactUs/contactSlice";

export default configureStore({
  reducer: {
    authReducer,
    adminReducer,
    postsReducer,
    galleryReducer,
    mainFilterReducer,
    contacts,
  },
  devTools: process.env.NODE_ENV !== "production",
});
