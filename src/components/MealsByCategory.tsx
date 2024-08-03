import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchCategoriesAsync } from "../store/features/meals/categorySlice";
import { Link } from "react-router-dom";

export default function MealsByCategory() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const categoryStatus = useSelector(
    (state: RootState) => state.categories.status
  );

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <section>
      <h2>Categories</h2>
      {categoryStatus === "loading" && <p>Loading categories...</p>}
      {categoryStatus === "succeeded" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.idCategory}
              to={`/category-list/${category.strCategory}`}
            >
              <h3>{category.strCategory}</h3>
              <img src={category.strCategoryThumb} alt={category.strCategory} />
            </Link>
          ))}
        </div>
      )}
      {categoryStatus === "failed" && <p>Error loading categories</p>}
    </section>
  );
}
