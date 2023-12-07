import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ExternalApis } from "../../api";

export interface ApiData {
  status: "idle" | "pending" | "rejected";
  data: any;
  error: any;
}

interface CartState {
  cart: ApiData;
}

export const fetchCartItems = createAsyncThunk("fetch/cartItems", async () => {
  return ExternalApis.fetchCart();
});

export const addCartItems = createAsyncThunk(
  "fetch/addCartItem",
  async (payload: any) => {
    return ExternalApis.addCartItems(payload);
  }
);

export const removeCartItems = createAsyncThunk(
  "fetch/removeCartItem",
  async (payload: any) => {
    return ExternalApis.removeCartItems(payload);
  }
);

const initialState = {
  cart: {
    status: "idle",
    data: {},
    error: null,
  },
} as CartState;

export const CartSlice = createSlice({
  name: "dishes",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchCartItems.pending.type]: (state: CartState, action: any) => {
      state.cart = {
        status: "pending",
        data: {},
        error: null,
      };
    },
    [fetchCartItems.fulfilled.type]: (state: CartState, action: any) => {
      state.cart = {
        status: "idle",
        data: action.payload || {},
        error: null,
      };
    },
    [fetchCartItems.rejected.type]: (state: CartState, action: any) => {
      state.cart = {
        status: "idle",
        data: {},
        error: action.payload,
      };
    },

    [addCartItems.fulfilled.type]: (state: CartState, action: any) => {
      state.cart = {
        status: "idle",
        data: action.payload || {},
        error: null,
      };
    },
    [removeCartItems.fulfilled.type]: (state: CartState, action: any) => {
      state.cart = {
        status: "idle",
        data: action.payload || {},
        error: null,
      };
    },
  },
});

export const CartItemsSelector = (state: any) => state.cart.cart;
export default CartSlice.reducer;
