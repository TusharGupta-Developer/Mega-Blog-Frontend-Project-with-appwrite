import { configureStore } from "@reduxjs/toolkit";
// import todoreducer from './authSlice'
import Authreducer from './authSlice'

export const store = configureStore({
    reducer:{
        auth: Authreducer
    }
});

export default store;