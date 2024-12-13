import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLoginAsync, userRegistrationAsync } from "../api/auth";

export const registerUser = createAsyncThunk('regiser', async(data) => {

    const response = await userRegistrationAsync(data)
    return response
})

export const loginUser = createAsyncThunk('login', async(data) => {

    const response = await userLoginAsync(data)
    return response
})

export const logoutUser = createAsyncThunk('logoutUser',() => {
    return
} )


const authSlice = createSlice({

    name: "auth",
    initialState: {
        user: {},
        loading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {

        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
        
            .addCase(loginUser.fulfilled, (state,action) => {
                state.loading =false;
                state.user = action.payload;
            })
        
            .addCase(loginUser.rejected, (state,action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null; 
            })

            .addCase('loginSuccess', (state, action) => {
                state.user = action.payload; 
            })
    }

})

export default authSlice.reducer