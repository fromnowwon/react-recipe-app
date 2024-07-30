import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MealCategory, MealCategoryResponse } from "../../../types/Category";
import { fetchMealCategories } from "../../../lib/api/category";

export interface CategoryState {
  categories: MealCategory[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: null,
};

export const fetchCategoriesAsync = createAsyncThunk<MealCategoryResponse>(
  "categories/fetch",
  async () => {
    const response = await fetchMealCategories();
    return response;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default categorySlice;
