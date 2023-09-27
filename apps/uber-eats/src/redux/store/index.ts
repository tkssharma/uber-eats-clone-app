import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../auth/auth.slice";
import RestaurantReducer from "../restaurant/restaurant.slice";
import DishReducer from "../dishes/dishes.slice";
import CartReducer from "../cart/cart.slice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    restaurant: RestaurantReducer,
    dishes: DishReducer,
    cart: CartReducer,
  },
  devTools: true,
});
