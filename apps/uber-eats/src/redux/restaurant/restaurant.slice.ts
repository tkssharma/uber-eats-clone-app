import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// use ExternalApis -- refactor code
export interface RestaurantState {
  restaurants: any;
  dishes?: any;
  filteredDishes?: any;
  selectedRestaurant?: any;
}
// we will add types in @eats/types package

export const fetchRestaurants = createAsyncThunk(
  "api/fetchRestaurantsData",
  // make these apis in external service
  // we are hitting proxy
  async () => {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/restaurant-service/restaurants/search?page=1&limit=3"
    );
    return data;
  }
);

export const fetchRestaurantById = createAsyncThunk(
  "api/fetchRestaurantById",
  // make these apis in external service
  // we are hitting proxy
  async (id: string) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/restaurant-service/restaurants/${id}`
    );
    return data;
  }
);

export const filteredRestaurants = createAsyncThunk(
  "api/fetchRestaurants",
  // make these apis in external service
  // we are hitting proxy
  async (filters: string) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/restaurant-service/dishes?${filters}&page=1&limit=20`
    );
    return data;
  }
);

export const fetchTopDishes = createAsyncThunk(
  "api/fetchDishes",
  // make these apis in external service
  // we are hitting proxy
  async (filters: string) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/restaurant-service/dishes?${filters}&page=1&limit=10`
    );
    return data;
  }
);

const initialState: RestaurantState = {
  restaurants: {
    status: "not-started",
    data: [],
    error: null,
  },
  dishes: {
    status: "not-started",
    data: [],
    error: null,
  },
  filteredDishes: {
    status: "not-started",
    data: [],
    error: null,
  },
  selectedRestaurant: {
    status: "not-started",
    data: [],
    error: null,
  },
};
export const RestaurantSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchRestaurants.pending.type]: (state: RestaurantState, action: any) => {
      state.restaurants = {
        status: "pending",
        data: [],
        error: null,
      };
    },
    [fetchRestaurants.fulfilled.type]: (
      state: RestaurantState,
      action: any
    ) => {
      state.restaurants = {
        status: "resolved",
        data: action.payload,
        error: null,
      };
    },
    [fetchRestaurants.rejected.type]: (state: RestaurantState, action: any) => {
      state.restaurants = {
        status: "rejected",
        data: [],
        error: null,
      };
    },
    [fetchTopDishes.pending.type]: (state: RestaurantState, action: any) => {
      state.dishes = {
        status: "pending",
        data: [],
        error: null,
      };
    },
    [fetchTopDishes.fulfilled.type]: (state: RestaurantState, action: any) => {
      state.dishes = {
        status: "resolved",
        data: action.payload,
        error: null,
      };
    },
    [fetchTopDishes.rejected.type]: (state: RestaurantState, action: any) => {
      state.dishes = {
        status: "rejected",
        data: [],
        error: null,
      };
    },
    [filteredRestaurants.pending.type]: (
      state: RestaurantState,
      action: any
    ) => {
      state.filteredDishes = {
        status: "pending",
        data: [],
        error: null,
      };
    },
    [filteredRestaurants.fulfilled.type]: (
      state: RestaurantState,
      action: any
    ) => {
      state.filteredDishes = {
        status: "resolved",
        data: action.payload,
        error: null,
      };
    },
    [filteredRestaurants.rejected.type]: (
      state: RestaurantState,
      action: any
    ) => {
      state.filteredDishes = {
        status: "rejected",
        data: [],
        error: null,
      };
    },
    [fetchRestaurantById.pending.type]: (
      state: RestaurantState,
      action: any
    ) => {
      state.selectedRestaurant = {
        status: "pending",
        data: [],
        error: null,
      };
    },
    [fetchRestaurantById.fulfilled.type]: (
      state: RestaurantState,
      action: any
    ) => {
      state.selectedRestaurant = {
        status: "resolved",
        data: action.payload,
        error: null,
      };
    },
    [fetchRestaurantById.rejected.type]: (
      state: RestaurantState,
      action: any
    ) => {
      state.selectedRestaurant = {
        status: "rejected",
        data: [],
        error: null,
      };
    },
  },
});

export const userSelector = (state: any) => state;
export const topRestaurants = (state: any) => state.restaurant.restaurants;
export const filteredDishes = (state: any) => state.restaurant.filteredDishes;
export const topDishes = (state: any) => state.restaurant.dishes;

export default RestaurantSlice.reducer;
