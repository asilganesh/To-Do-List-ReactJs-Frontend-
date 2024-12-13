import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addListsAsync, getListsAsync, removeListAsync } from "../api/lists";

export const getList = createAsyncThunk('getList', async(userId) => {
console.log(userId)
    const response = await getListsAsync(userId)
    return response
})

export const addList = createAsyncThunk('addList', async(data) => {
    const response = await addListsAsync(data)

    return response
})

export const removeList = createAsyncThunk('remove', async(data) => {
    const response = await removeListAsync(data)
    return response
})

const listSlice = createSlice({

    name:"list",
    initialState:{
        list : [],
        loading:false

    },

    reducers: {},

    extraReducers: (builder) => {

        builder
        .addCase(getList.pending, (state) => {
            state.loading = true;
        })

        .addCase(getList.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.data
        })

        .addCase(getList.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message;
        })

        .addCase(addList.pending, (state) => {
            state.loading = true;
        })

        .addCase(addList.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.data.data
        })

        .addCase(addList.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message;
        })

        .addCase(removeList.pending, (state) => {
            state.loading = true;
        })

        .addCase(removeList.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.data.data
        })

        .addCase(removeList.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message;
        })

    }
})

export default listSlice.reducer