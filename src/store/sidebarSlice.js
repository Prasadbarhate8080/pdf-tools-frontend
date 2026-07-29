import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpenSidebar: false,
}

const sidebarSlice = createSlice({
  name: 'sidebarToggle',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpenSidebar = !state.isOpenSidebar
    },
  },
})

export const { toggleSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
