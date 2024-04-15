import { apiUrl, token } from "../../../utils/config";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const initialState = {
  colorsList: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

export const createColorAction = createAsyncThunk(
  "color/create",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { data } = await apiUrl.post("colors", formData, token);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchColorAction = createAsyncThunk(
  "color/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiUrl.get("colors");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
    });
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.error = action.payload;
    });
    builder.addCase(fetchColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colorsList = action.payload;
    });
    builder.addCase(fetchColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = [];
      state.error = action.payload;
    });
  },
});

const colorReducer = colorSlice.reducer;
export default colorReducer;
