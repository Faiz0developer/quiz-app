import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './slices/tokenSlice'
import userReducer from './slices/UserSlice'

export const store = configureStore({
    reducer:{
        tokenReducer,
        userReducer
    }
})