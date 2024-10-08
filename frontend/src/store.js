import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './slices/apiSlice';
import authSliceReducer from './slices/authSlice';
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authSliceReducer
    }, // Add your reducers here
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV === 'development', // Enable Redux DevTools in development mode
})
export default store;