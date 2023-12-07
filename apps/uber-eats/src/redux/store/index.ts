import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../auth/auth.slice";
import RestaurantReducer from "../restaurant/restaurant.slice";
import DishReducer from "../dishes/dishes.slice";
import CartReducer from "../cart/cart.slice";
import UserReducer from "../user/user.slice";
import OrderReducer from "../order/order.slice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    restaurant: RestaurantReducer,
    dishes: DishReducer,
    cart: CartReducer,
    user: UserReducer,
    order: OrderReducer,
  },
  devTools: true,
});
