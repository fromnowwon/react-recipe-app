import { configureStore } from "@reduxjs/toolkit";
import { mealSlice } from "./features/meals/searchSlice";
import categorySlice from "./features/meals/categorySlice";
import categoryListSlice from "./features/meals/categoryListSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import detailSlice from "./features/meals/detailSlice";

export const store = configureStore({
  reducer: {
    categories: categorySlice.reducer,
    categoryList: categoryListSlice.reducer,
    search: mealSlice.reducer,
    detail: detailSlice.reducer,
  },
});

// RootState와 AppDispatch 타입 정의
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Thunk Dispatch 타입 정의
export type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;

// useAppDispatch 커스텀 훅 정의
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
