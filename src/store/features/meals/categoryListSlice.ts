import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { filteredCategoryList } from "../../../types/Category";
import { fetchFilteredCategoryList } from "../../../lib/api/category";

interface CategoryListParams {
  category: string;
}

export interface CategoryListState {
  list: filteredCategoryList[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoryListState = {
  list: [],
  status: "idle",
  error: null,
};

export const fetchCategoryListAsync = createAsyncThunk<
  { categoryList: filteredCategoryList[] },
  CategoryListParams
>("categoryList/fetch", async ({ category }) => {
  const response = await fetchFilteredCategoryList(category);
  return { categoryList: response.meals };
});

const categoryListSlice = createSlice({
  name: "categoryList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryListAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategoryListAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.categoryList;
      })
      .addCase(fetchCategoryListAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default categoryListSlice;
