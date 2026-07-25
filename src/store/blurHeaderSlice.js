import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blurHeader: false,
}

const blurHeaderSlice = createSlice({
  name: 'blurHeader',
  initialState,
  reducers: {
    showBlurHeader: (state) => {
      state.blurHeader = true
    },
    hideBlurHeader: (state) => {
      state.blurHeader = false
    },
  },
})

export const { hideBlurHeader, showBlurHeader } = blurHeaderSlice.actions

export default blurHeaderSlice.reducer
