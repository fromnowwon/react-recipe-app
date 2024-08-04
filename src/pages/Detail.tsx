import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDetailAsync } from "../store/features/meals/detailSlice";
import { DetailMeal } from "../types/Detail";

export default function Detail() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const meals = useSelector((state: RootState) => state.detail.meals);
  const status = useSelector((state: RootState) => state.detail.status);
  const error = useSelector((state: RootState) => state.detail.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailAsync({ id }));
    }
  }, [id, dispatch]);

  return (
    <section>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" &&
        meals.length > 0 &&
        meals.map((meal: DetailMeal) => {
          const ingredients: string[] = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}` as keyof DetailMeal];
            const measure = meal[`strMeasure${i}` as keyof DetailMeal];
            if (ingredient) {
              ingredients.push(`${measure} ${ingredient}`);
            }
          }
          return (
            <div key={meal.idMeal}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-72 object-cover rounded-lg mb-6"
              />
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <div className="md:w-1/2">
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Category:</span>{" "}
                    {meal.strCategory}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">Area:</span> {meal.strArea}
                  </p>
                </div>
                <div className="md:w-1/2 md:text-right">
                  {meal.strTags && (
                    <p className="text-lg mb-2">
                      <span className="font-semibold">Tags:</span>{" "}
                      {meal.strTags.split(",").join(", ")}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                {meal.strYoutube && (
                  <a
                    href={meal.strYoutube}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch on YouTube
                  </a>
                )}
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
                <ul className="list-disc list-inside">
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
                <p className="whitespace-pre-line">{meal.strInstructions}</p>
              </div>
            </div>
          );
        })}
    </section>
  );
}
