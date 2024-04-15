import { apiUrl, token } from "../../../utils/config";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//initial state
export const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create new category action
export const createCategoryAction = createAsyncThunk(
  "category/create-category",
  async ({ name }, { rejectWithValue }) => {
    try {
      const { data } = await apiUrl.post("categories", { name }, token);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch categroies action
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch-all-categories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiUrl.get("categories");
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//create slice
export const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;
      state.error = action.payload;
    });
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      //   state.categories = [];
      state.error = action.payload;
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
