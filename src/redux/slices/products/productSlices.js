import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { token, tokenForUploadImage } from "../../../utils/config";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

// initial state
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create product action
export const createProductAction = createAsyncThunk(
  "products/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        files,
      } = payload;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("totalQty", totalQty);

      colors.forEach((color) => {
        formData.append("colors", color);
      });
      sizes.forEach((size) => {
        formData.append("sizes", size);
      });
      files.forEach((file) => {
        formData.append("files", file);
      });

      const { data } = await axios.post(`${baseURL}products`, formData, token);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//create product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    //create product
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});

//create product reducer
const productReducer = productSlice.reducer;
export default productReducer;
