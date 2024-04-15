import { apiUrl, token } from "../../../utils/config";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const initialState = {
  brandList: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

export const createBrandAction = createAsyncThunk(
  "brand/create",
  async ({ formData }, { rejecteWithValue }) => {
    try {
      const { data } = await apiUrl.post("brands", formData, token);
      return data;
    } catch (error) {
      return rejecteWithValue(error?.response?.data);
    }
  }
);

export const fetchBrandAction = createAsyncThunk(
  "brand/fetch",
  async (_, { rejecteWithValue }) => {
    try {
      const { data } = await apiUrl.get("brands");
      return data;
    } catch (error) {
      return rejecteWithValue(error?.response?.data);
    }
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.error = action.payload;
    });
    builder.addCase(fetchBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brandList = action.payload;
    });
    builder.addCase(fetchBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const brandReducer = brandSlice.reducer;
export default brandReducer;
