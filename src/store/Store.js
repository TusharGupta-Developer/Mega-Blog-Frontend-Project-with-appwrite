import { configureStore } from "@reduxjs/toolkit";
import todoreducer from './authSlice'

export const store = configureStore({
    reducer:{
        todoreducer
    }
});

export default store;