"use client"
import {configureStore} from '@reduxjs/toolkit';
import pdfFilesSlice from './pdfFilesSlice.js'

const store = configureStore({
    reducer: {
        pdfFiles: pdfFilesSlice
    }
});


export default store;