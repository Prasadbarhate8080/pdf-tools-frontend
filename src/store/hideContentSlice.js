import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  hideContent: false,
}

const hideContentSlice = createSlice({
  name: 'hideContent',
  initialState,
  reducers: {
    showContent: (state) => {
      state.hideContent = false
    },
    hideContent: (state) => {
      state.hideContent = true
    },
  },
})

export const { hideContent, showContent } = hideContentSlice.actions

export default hideContentSlice.reducer
