import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/userSlice";
import storeReducer from "./features/storeSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        store: storeReducer,
    },
})