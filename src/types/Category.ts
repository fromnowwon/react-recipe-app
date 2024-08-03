export interface MealCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealCategoryResponse {
  categories: MealCategory[];
}

export interface filteredCategoryList {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface CategoryListResponse {
  categoryList: filteredCategoryList[];
}
