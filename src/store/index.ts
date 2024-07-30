import { configureStore } from "@reduxjs/toolkit";
import { mealSlice } from "./features/meals/searchSlice";
import categorySlice from "./features/meals/categorySlice";

export const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
    search: mealSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
