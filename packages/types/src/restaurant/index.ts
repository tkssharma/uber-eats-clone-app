export enum mealType {
  "breakfast" = "breakfast",
  "lunch" = "lunch",
  "dinner" = "dinner",
}
export enum cuisineType {
  "indian" = "indian",
  "north_indian" = "north_indian",
  "italian" = "italian",
  "chinese" = "chinese",
}

export enum foodType {
  "veg" = "veg",
  "non_veg" = "non_veg",
  "vegan" = "vegan",
}

export interface MenuItem {
  name: string;
  description: string;
  cuisine_type: cuisineType;
  meal_type: mealType;
  category: string;
  ingredients: string;
  food_type: foodType;
  price: number;
  thumbnails: string[];
}
