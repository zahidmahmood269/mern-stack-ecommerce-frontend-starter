import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";

//create store
const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
