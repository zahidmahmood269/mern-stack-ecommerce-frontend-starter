import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import { resetErrorAction } from "./globalActions/globalActions";

// initial State
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: {},
  },
};

// login action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`${baseURL}users/login`, {
        email,
        password,
      });
      //save the user itno local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async ({ fullname, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}users/register`, {
        fullname,
        email,
        password,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//users slice
const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // handle actions
    // login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.pending = false;
      state.userAuth.error = action.payload;
    });
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // reset error action
    builder.addCase(resetErrorAction.pending, (state) => {
      state.error = null;
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
