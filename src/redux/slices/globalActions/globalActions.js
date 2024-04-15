import { createAsyncThunk } from "@reduxjs/toolkit";

// error action
export const resetErrorAction = createAsyncThunk("resetErr-Action", () => {
  return {};
});

//reset success action
export const resetSuccessAction = createAsyncThunk(
  "resetSuccess-Action",
  () => {
    return {};
  }
);
