"use client"
import {configureStore} from '@reduxjs/toolkit';
import pdfFilesSlice from './pdfFilesSlice.js'
import ProgressBarSlice from './progressBarSlice.js'

const store = configureStore({
    reducer: {
        pdfFiles: pdfFilesSlice,
        fileProgress: ProgressBarSlice
    }
});


export default store;