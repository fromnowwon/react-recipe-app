import { MealResponse } from "../../types/Meal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchMeals = async (query: string): Promise<MealResponse> => {
  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
    {
      method: "GET",
    }
  );

  const data: MealResponse = await response.json();

  return data;
};
