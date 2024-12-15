import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import profileReducer from "./slices/profileSlice"; 
import affiliateReducer from "./slices/affiliateSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        profile: profileReducer,
        affiliate: affiliateReducer,
    },
});

export default store;
