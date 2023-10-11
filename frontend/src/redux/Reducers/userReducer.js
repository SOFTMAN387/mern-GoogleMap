import {  createSlice } from "@reduxjs/toolkit";
const mapSlice = createSlice({
    name: "softman-map",
    initialState: {
        currentUser: []
        // forgotUser: [],
        // favourite: []

    },
    reducers: {
        loginUser: (state, action) => {
            state.currentUser = action.payload;
        },
        logoutUser: (state) => {
            state.currentUser = [];
        },
        // forgotPassword: (state, action) => {
        //     state.forgotUser = action.payload;
        // },
        // newPassword: (state) => {
        //     state.forgotUser = [];
        // },
        // addFavourite: (state, action) => {
        //     state.favourite.push(action.payload);
        // },
        // clearToFav: (state) => {
        //     state.favourite = [];
        // }

    },
});
export const actions = mapSlice.actions;
// const store = configureStore({ reducer: mapSlice.reducer, });
export default mapSlice.reducer;