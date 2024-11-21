import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import adminReducer from "../components/pages/admin/adminSlice";

import postsReducer from "../components/adminPanel/addPostsForm/postSlice";
import galleryReducer from "../components/gallery/gallerySlice";
import mainFilterReducer from "../components/filters/mainFilters.slice";
import shoppingCartReducer from "../components/pages/shoppingCart/shoppingCartSlice.js";
import contacts from "../components/pages/contactUs/contactSlice";
import checkoutReducer from "../components/pages/checkout/checkoutSlice";

export default configureStore({
  reducer: {
    authReducer,
    adminReducer,
    postsReducer,
    galleryReducer,
    mainFilterReducer,
    shoppingCartReducer,
    contacts,
    checkoutReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
