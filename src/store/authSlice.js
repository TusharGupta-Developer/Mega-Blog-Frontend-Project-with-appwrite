import { createSlice } from "@reduxjs/toolkit";

// This slice made for to asking the store that user is authenticated or not

const initialState = {
    status: false, // means user is not authenticated currently
    userData: null // means there is no user user data
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => { // when user login 
            state.status = true;
            // state.userData = action.payload; // sets userData to the whole payload object.

            state.userData = action.payload.userData; //sets userData to just the userData property of the payload object.

            // Self: state = action.payload.userData; overwrites the entire state with just userData, which is usually incorrect.(not recommended)
        },
        logout: (state) => {
            state.status = false;
            state.userData = false;
        }
    }

})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;