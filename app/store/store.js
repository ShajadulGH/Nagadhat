// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import profileReducer from "./slices/profileSlice"; // Import the new slice

export const store = configureStore({
    reducer: {
        cart: cartReducer,       // Existing reducer
        profile: profileReducer, // New reducer for profile
    },
});

export default store;
