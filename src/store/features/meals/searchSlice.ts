import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Meal, MealResponse } from "../../../types/Meal";
import { fetchMeals } from "../../../lib/api/search";

export interface MealsState {
  meals: Meal[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MealsState = {
  meals: [],
  status: "idle",
  error: null,
};

interface FetchMealsParams {
  query: string;
}

export const fetchMealsAsync = createAsyncThunk<
  MealResponse, // 반환 타입
  FetchMealsParams // 인자 타입
>("meals/fetch", async ({ query }: FetchMealsParams) => {
  const response = await fetchMeals(query);
  return response;
});

export const mealSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMealsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload.meals;
      })
      .addCase(fetchMealsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});
