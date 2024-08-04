import { useEffect } from "react";
import { RootState, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategoryListAsync } from "../store/features/meals/categoryListSlice";
import { filteredCategoryList } from "../types/Category";

export default function CategoriList() {
  const { category } = useParams<{ category: string }>();

  const dispatch = useAppDispatch();
  const categoryList = useSelector(
    (state: RootState) => state.categoryList.list
  );
  const status = useSelector((state: RootState) => state.categoryList.status);
  const error = useSelector((state: RootState) => state.categoryList.error);

  useEffect(() => {
    if (category) {
      dispatch(fetchCategoryListAsync({ category }));
    }
  }, [category, dispatch]);

  return (
    <div>
      <h2>{category}</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" &&
        categoryList.length > 0 &&
        categoryList.map((list: filteredCategoryList) => (
          <div key={list.idMeal}>{list.strMeal}</div>
        ))}
    </div>
  );
}
