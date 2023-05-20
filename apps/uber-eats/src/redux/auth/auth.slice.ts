import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  auth: any;
}

const initialState: UserState = {
  auth: {
    isLoggedIn: false,
  },
};
export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state: any, action: any) => {
      return {
        ...state,
        auth: {
          isLoggedIn: true,
        },
      };
    },
    loginFailure: (state: any, action: any) => {
      return {
        ...state,
        auth: {
          isLoggedIn: true,
        },
      };
    },
  },
  extraReducers: {},
});

export const { loginFailure, loginSuccess } = AuthSlice.actions;
export const userSelector = (state: any) => state;
export default AuthSlice.reducer;
