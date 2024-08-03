const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchMealCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories.php`, {
    method: "GET",
  });
  const data = await response.json();

  return data;
};

export const fetchFilteredCategoryList = async (category: string) => {
  const response = await fetch(`${BASE_URL}/filter.php?c=${category}`, {
    method: "GET",
  });
  const data = await response.json();

  return data;
};
