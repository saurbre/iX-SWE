import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/authSlice";
// import authorReducer from "../features/authorSlice";
import blogReducer from "../features/blogSlice";
import categoryReducer from "../features/categorySlice";

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    // author: authorReducer,
    blogs: blogReducer,
    categories: categoryReducer,
  },
});