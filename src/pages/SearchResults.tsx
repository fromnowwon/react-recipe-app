import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchMealsAsync } from "../store/features/meals/searchSlice";
import { RootState, useAppDispatch } from "../store";

export default function SearchResults() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const meals = useSelector((state: RootState) => state.search.meals);
  const status = useSelector((state: RootState) => state.search.status);
  const error = useSelector((state: RootState) => state.search.error);

  // 쿼리 파라미터에서 검색어 추출
  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (query) {
      dispatch(fetchMealsAsync({ query }));
    }
  }, [query, dispatch]);

  return (
    <div>
      <h1>Search Results</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && meals.length === 0 && <p>No results found.</p>}
      {status === "succeeded" && meals.length > 0 && (
        <div>
          {meals.map((meal) => (
            <div key={meal.idMeal}>
              <h3>{meal.strMeal}</h3>
              <img src={`${meal.strMealThumb}`} alt={meal.strMeal} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
