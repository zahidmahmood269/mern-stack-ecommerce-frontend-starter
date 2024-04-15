import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import productReducer from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categoriesSlice";
import brandReducer from "../slices/brands/brandsSlice";
import colorReducer from "../slices/colors/colorsSlice";

//create store
const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorReducer,
  },
});

export default store;
