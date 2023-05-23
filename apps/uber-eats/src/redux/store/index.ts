import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../auth/auth.slice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
  },
  devTools: true,
});
