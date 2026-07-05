"use client"
import {configureStore} from '@reduxjs/toolkit';
import pdfFilesSlice from './pdfFilesSlice.js'
import ProgressBarSlice from './progressBarSlice.js'
import hideContentSlice from "./hideContentSlice.js"

const store = configureStore({
    reducer: {
        pdfFiles: pdfFilesSlice,
        fileProgress: ProgressBarSlice,
        hideContent: hideContentSlice
    }
});


export default store;