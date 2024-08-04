const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchDetail = async (id: string) => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`, {
    method: "GET",
  });
  const data = await response.json();

  return data;
};
