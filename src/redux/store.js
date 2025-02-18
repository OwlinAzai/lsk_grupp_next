import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // we'll create this next

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
