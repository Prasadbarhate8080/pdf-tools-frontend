"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    progress: 0
}


const progressBarSlice = createSlice({
    name: "fileProgress",
    initialState,
    reducers: {
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
     }
})

export const {setProgress } = progressBarSlice.actions;

export default progressBarSlice.reducer;