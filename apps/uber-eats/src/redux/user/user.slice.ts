import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExternalApis } from "../../api";

export interface ApiData {
  status: "idle" | "pending" | "rejected";
  data: any;
  error: any;
}

interface UserState {
  addresses: ApiData;
  orders: ApiData;
}

export const fetchOrders = createAsyncThunk("fetch/fetchOrders", async () => {
  return ExternalApis.fetchCart();
});

export const fetchAddress = createAsyncThunk("fetch/fetchAddress", async () => {
  return ExternalApis.fetchAddress();
});

export const createAddress = createAsyncThunk(
  "fetch/CreateAddress",
  async (_arg: any) => {
    return ExternalApis.createAddress(_arg);
  }
);

const initialState = {
  addresses: {
    status: "idle",
    data: [],
    error: null,
  },
  selectedAddress: null,
  orders: {
    status: "idle",
    data: [],
    error: null,
  },
} as UserState;

export const UserSlice = createSlice({
  name: "dishes",
  initialState: initialState,
  reducers: {
    selectAddress: (state: any, action: any) => {
      return {
        ...state,
        selectedAddress: action.payload,
      };
    },
  },
  extraReducers: {
    [fetchAddress.fulfilled.type]: (state: UserState, action: any) => {
      state.addresses = {
        status: "idle",
        data: action.payload || [],
        error: null,
      };
    },
    [createAddress.fulfilled.type]: (state: UserState, action: any) => {
      state.addresses.data.push(action.payload);
    },
  },
});

export const { selectAddress } = UserSlice.actions;
export const UserAddressSelector = (state: any) => state.user.addresses;
export const selectedUserAddressSelector = (state: any) =>
  state.user.selectedAddress;
export const UserOrdersSelector = (state: any) => state.user.orders;

export default UserSlice.reducer;
