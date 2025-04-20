"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    files: [],
    progress: 0
}

const pdfFilesSlice = createSlice({
    name: "pdfFiles",
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload;
        },
     }
})

export const {setFiles } = pdfFilesSlice.actions;

export default pdfFilesSlice.reducer;