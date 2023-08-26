import {createSlice} from '@reduxjs/toolkit';
//appAPI
import appAPI from '../services/appAPI';

const initialState = null;

export const userSlice = createSlice ({
    name: "products",
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(appAPI.endpoints.signup.matchFulfilled, (_, {payload}) => payload);
        builder.addMatcher(appAPI.endpoints.login.matchFulfilled, (_, {payload}) => payload);
    },
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;