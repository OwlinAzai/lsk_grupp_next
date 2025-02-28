import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../app/reducers/cartReducer.js"; // we'll create this next

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
