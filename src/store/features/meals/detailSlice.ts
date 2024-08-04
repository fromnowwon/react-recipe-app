import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDetail } from "../../../lib/api/detail";
import { DetailMeal, DetailResponse } from "../../../types/Detail";

interface DetailParams {
  id: string;
}

interface DetailState {
  meals: DetailMeal[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DetailState = {
  meals: [],
  status: "idle",
  error: null,
};

export const fetchDetailAsync = createAsyncThunk<DetailResponse, DetailParams>(
  "detail/fetch",
  async ({ id }) => {
    const response = await fetchDetail(id);
    return response;
  }
);

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDetailAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload.meals;
      })
      .addCase(fetchDetailAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default detailSlice;
