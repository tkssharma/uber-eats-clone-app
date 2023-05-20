import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface RestaurantState {
  data: any;
}

export const fetchRestaurants = createAsyncThunk(
  "api/fetchRestaurants",
  async () => {
    return await axios.get("");
  }
);

const initialState: RestaurantState = {
  data: {},
};
export const RestaurantSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchRestaurants.pending.type]: (state: RestaurantState, action: any) => {
      state.data = {
        status: "pending",
        data: [],
        error: null,
      };
    },
    [fetchRestaurants.fulfilled.type]: (
      state: RestaurantState,
      action: any
    ) => {
      state.data = {
        status: "resolved",
        data: action.payload,
        error: null,
      };
    },
    [fetchRestaurants.rejected.type]: (state: RestaurantState, action: any) => {
      state.data = {
        status: "rejected",
        data: [],
        error: null,
      };
    },
  },
});

export const userSelector = (state: any) => state;
export default RestaurantSlice.reducer;
