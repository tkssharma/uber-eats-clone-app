import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// use ExternalApis -- refactor code
export interface RestaurantState {
  dishes?: any;
}
// we will add types in @eats/types package

export const fetchDishesForLandingPage = createAsyncThunk(
  "api/fetchDishesForLandingPage",
  // make these apis in external service
  // we are hitting proxy
  async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/restaurant-service/dishes?&page=1&limit=50`
    );

    const foodData = data.map((item: any) => {
      return {
        id: item.id,
        dish_id: item.id,
        name: item.name,
        description: item.description,
        thumbnails: item.thumbnails,
        food_image: item.thumbnails,
        cuisine_type: item.cuisine_type,
        food_type: item.food_type,
        meal_type: item.meal_type,
        price: item.price,
        menu_id: item.category,
        restarant_id: item.restaurant.id,
        restaurant: item.restaurant,
        status: true,
      };
    });
    // duplicates removal

    const categories = data.map((item: any) => {
      return {
        name: item.category,
        id: item.category,
        menu_image: item.thumbnails,
      };
    });
    const uniqueCategory: any = removeDuplicates(categories);

    return {
      // set one category default selected
      selectedCategory: uniqueCategory[0],
      // all menu category
      menuCategory: uniqueCategory,
      foodHolder: foodData,
      food: foodData,
    };
  }
);

const initialState: RestaurantState = {
  dishes: {
    status: "not-started",
    data: {
      selectedCategory: null,
      menuCategory: [],
      food: [],
      foodHolder: [],
    },
    error: null,
  },
};
export const DishMenuItemSlice = createSlice({
  name: "dishes",
  initialState: initialState,
  reducers: {
    // ADD ANY SYNC FUNCTION
    changeFoodCategorySelection: (state: RestaurantState, action: any) => {
      const data = state.dishes.data;
      const menu = action.payload;
      // apply filter based ons selected category
      const food = data.food.filter((i: any) => menu.id === i.menu_id);
      state.dishes = {
        status: "resolved",
        data: {
          ...data,
          selectedCategory: menu,
          foodHolder: food,
        },
        error: null,
      };
    },
  },
  extraReducers: {
    [fetchDishesForLandingPage.pending.type]: (
      state: RestaurantState,
      action: any
    ) => {
      state.dishes = {
        status: "pending",
        data: [],
        error: null,
      };
    },
    [fetchDishesForLandingPage.fulfilled.type]: (
      state: RestaurantState,
      action: any
    ) => {
      state.dishes = {
        status: "resolved",
        data: action.payload,
        error: null,
      };
    },
    [fetchDishesForLandingPage.rejected.type]: (
      state: RestaurantState,
      action: any
    ) => {
      state.dishes = {
        status: "rejected",
        data: [],
        error: null,
      };
    },
  },
});

const removeDuplicates = (array: any) => {
  const jsonObject = array.map(JSON.stringify);
  const uniqueSet = new Set(jsonObject);
  const uniqueArray = Array.from(uniqueSet).map(JSON.parse as any);

  return uniqueArray;
};
export const listDishesForLandingPage = (state: any) => state.dishes.dishes;
const { actions, reducer } = DishMenuItemSlice;

export const { changeFoodCategorySelection } = actions;

export default DishMenuItemSlice.reducer;
