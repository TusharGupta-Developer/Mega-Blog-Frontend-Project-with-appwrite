import { configureStore } from "@reduxjs/toolkit";
// import todoreducer from './authSlice'
import authreducer from './authSlice'

export const store = configureStore({
    reducer:{
        auth: authreducer
    }
});

export default store;