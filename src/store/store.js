"use client"
import {configureStore} from '@reduxjs/toolkit';
import pdfFilesSlice from './pdfFilesSlice.js'
import ProgressBarSlice from './progressBarSlice.js'
import hideContentSlice from "./hideContentSlice.js"
import blurHeaderSlice from "./blurHeaderSlice.js"
import sidebarSlice from "./sidebarSlice.js"

const store = configureStore({
    reducer: {
        pdfFiles: pdfFilesSlice,
        fileProgress: ProgressBarSlice,
        hideContent: hideContentSlice,
        blurHeader: blurHeaderSlice,
        sidebarToggle: sidebarSlice
    },
});


export default store;